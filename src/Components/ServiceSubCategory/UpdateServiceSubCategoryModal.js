import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal } from "react-bootstrap";
import { updateServiceSubCategory } from "../../redux/actions/serviceAction";
import Loader from "../Loader";

const UpdateServiceSubCategoryModal = ({
  updateServiceSubCategoryModal,
  setUpdateServiceSubCategoryModal,
  serviceCategory,
  previousData
}) => {
  const [name, setName] = useState(previousData.name);
  const [iconUrl, setIconUrl] = useState("");
  const dispatch = useDispatch();
  const loader = useSelector((store) => store.serviceRoot.loader);

  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setIconUrl(img);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    if (iconUrl !== "") {
      formData.append("iconUrl", iconUrl)
    }
    formData.append("serviceCategory", serviceCategory)
    dispatch(updateServiceSubCategory(previousData._id,formData,()=>{
        setUpdateServiceSubCategoryModal(false)
        setName("")
        setIconUrl("")
       
    }))
  };

  return (
    <>
      <Modal
        show={updateServiceSubCategoryModal}
        onHide={() => setUpdateServiceSubCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>SERVICE-SUB-CATEGORY ( {previousData.name} )</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label>SERVICE-SUB-CATEGORY NAME</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ICON</Form.Label>
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
                Submit
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateServiceSubCategoryModal;
