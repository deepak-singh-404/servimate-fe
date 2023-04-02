import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import { utilityContentTypes } from "../../config/constant";
import { addUtilityContent } from "../../redux/actions/commonAction";
import {
  getServiceCategories,
  getServiceSubCategories,
} from "../../redux/actions/serviceAction";
import { getCities } from "../../redux/actions/cityAction";

const AddUtilityContentModal = ({
  addUtilityContentModal,
  setAddUtilityContentModal,
}) => {
  const [contentType, setContentType] = useState("");
  const [index, setIndex] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [city, setCity] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSubCategory, setServiceSubCategory] = useState("");
  const dispatch = useDispatch();
  const reduxData = useSelector((store) => store);
  const { serviceRoot, cityRoot } = reduxData;
  const { serviceCategories, serviceSubCategories, loader } = serviceRoot;

  useEffect(() => {
    dispatch(getServiceCategories());
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (serviceCategory) {
      dispatch(getServiceSubCategories(serviceCategory));
    }
  }, [serviceCategory]);

  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setPicture(img);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (picture == "") {
      alert("Fields are empty.");
      return;
    }
    let _redirectionUrl = "";
    let metaData = {};
    if (city) {
      const _city = cityRoot.cities.find((c) => c._id == city);
      if (_city) {
        _redirectionUrl = `cityId=${_city._id}/cityName=${_city.name}`;
        metaData["cityId"] = _city._id;
        metaData["cityName"] = _city.name;
      }
    }
    if (serviceCategory) {
      const _serviceCategory = serviceCategories.find(
        (c) => c._id == serviceCategory
      );
      if (_serviceCategory) {
        _redirectionUrl =
          _redirectionUrl +
          `/serviceCategoryId=${_serviceCategory._id}/serviceCategoryName=${_serviceCategory.name}`;
        metaData["serviceCategoryId"] = _serviceCategory._id;
        metaData["serviceCategoryName"] = _serviceCategory.name;
      }
    }
    if (serviceSubCategory) {
      const _serviceSubCategory = serviceSubCategories.find(
        (c) => c._id == serviceSubCategory
      );
      if (_serviceSubCategory) {
        _redirectionUrl =
          _redirectionUrl +
          `/serviceSubCategoryId=${_serviceSubCategory._id}/serviceSubCategoryName=${_serviceSubCategory.name}`;
          metaData["serviceSubCategoryId"] = _serviceSubCategory._id};
          metaData["serviceSubCategoryName"] = _serviceSubCategory.name;
      }
    const formData = new FormData();
    formData.append("picture", picture);
    let params = `contentType=${contentType}&title=${title}&index=${index}&redirectionUrl=${
      _redirectionUrl ? JSON.stringify(_redirectionUrl) : redirectionUrl}&metaData=${JSON.stringify(metaData)}
    `;
    dispatch(
      addUtilityContent(params, formData, () => {
        setAddUtilityContentModal(false);
      })
    );
    return;
  };

  return (
    <div>
      <Modal
        show={addUtilityContentModal}
        onHide={() => setAddUtilityContentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>UTILITY CONTENT MANAGER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label>UTLITY CONTENT TYPE</Form.Label>
              <Form.Control
                required
                onChange={(e) => setContentType(e.target.value)}
                as="select"
              >
                <option>Select</option>
                {utilityContentTypes.map((d) => (
                  <option value={d.value}>{d.title}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Index</Form.Label>
              <Form.Control
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                onChange={(e) => setCity(e.target.value)}
                as="select"
              >
                <option>Select</option>
                {cityRoot.cities.length !== 0
                  ? cityRoot.cities.map((c) => (
                      <option value={c._id}>{c.name}</option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Service Category</Form.Label>
              <Form.Control
                required
                onChange={(e) => setServiceCategory(e.target.value)}
                as="select"
              >
                <option>Select</option>
                {serviceCategories.length !== 0
                  ? serviceCategories.map((c) => (
                      <option value={c._id}>{c.name}</option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Service Sub Category</Form.Label>
              <Form.Control
                required
                onChange={(e) => setServiceSubCategory(e.target.value)}
                as="select"
              >
                <option>Select</option>
                {serviceSubCategories.length !== 0
                  ? serviceSubCategories.map((c) => (
                      <option value={c._id}>{c.name}</option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Redirection endpoint</Form.Label>
              <Form.Control
                value={redirectionUrl}
                onChange={(e) => setRedirectionUrl(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Picture</Form.Label>
              <Form.Control
                accept=".jpg,.png,.jpeg"
                onChange={imagehandler}
                type="file"
              />
            </Form.Group>
            {loader ? (
              <Loader />
            ) : (
              <Button variant="primary" type="submit">
                Add
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUtilityContentModal;
