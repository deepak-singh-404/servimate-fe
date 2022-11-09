import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap'
import { addBanners } from '../../redux/actions/homeScreen'
import Loader from "../Loader";
import { getCities } from '../../redux/actions/cityAction'

const AddBannerModal = ({ addBannerModal, setAddBannerModal }) => {
  const [title, setTitle] = useState("")
  const [picture, setPicture] = useState("")
  const [city, setCity] = useState("")
  const dispatch = useDispatch();
  const { loader } = useSelector(store => store.homeScreenRoot)
  const cityRoot = useSelector(store => store.cityRoot)


  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setPicture(img);
    }
  };

  //Get all cities
  useEffect(() => {
    dispatch(getCities())
  }, [])

  const formHandler = async (e) => {
    e.preventDefault();
    if (!city) {
      alert("Please select city.")
      return
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("city", city)
    if (picture !== "") {
      formData.append("picture", picture);
    }
    dispatch(addBanners(formData, () => {
      setAddBannerModal(false)
      setTitle("")
    }));
  }
  return (
    <div>
      <Modal
        show={addBannerModal}
        onHide={() => setAddBannerModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>BANNER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>City *</Form.Label>
              <Form.Control required onChange={(e) => setCity(e.target.value)} as="select">
                <option>Select</option>
                {cityRoot.cities.length !== 0 ? cityRoot.cities.map(c =>
                  <option value={c._id}>{c.name}</option>
                ) : null}
              </Form.Control>
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
  )
}

export default AddBannerModal
