import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal, Table } from "react-bootstrap";
import { addService, getServiceCategory } from "../../redux/actions/serviceAction";
import Loader from "../Loader";



const AddServiceModal = ({
  addServiceModal,
  setAddServiceModal,
  serviceSubCategory,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState([]);
  const [includes, setIncludes] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();
  const serviceRoot = useSelector((store) => store.serviceRoot);
  const { loader, success, singleServiceCategory } = serviceRoot;

  const iconUrlHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setIconUrl(img);
    }
  };

  const imgUrlHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImgUrl(img);
    }
  }

  const handleInputChange = (city,name, type, value) => {
    const newPrice = [...price]
    const index = newPrice.findIndex(o => o.city === city)
    if (index === -1) {
      if (type === "actualPrice") {
        newPrice.push({ city, cityName: name, "actualPrice": value, "discountedPrice": 0 })
      }
      if (type === "discountedPrice") {
        newPrice.push({ city, cityName: name, "discountedPrice": value, "actualPrice": 0 })
      }
    }
    else {
      let tempObj = newPrice[index]
      if (type === "actualPrice") {
        tempObj.actualPrice = value
      }
      if (type === "discountedPrice") {
        tempObj.discountedPrice = value
      }
      newPrice[index] = tempObj
    }
    setPrice(newPrice)
  }

useEffect(() => {
  const service_category = localStorage.getItem("service-category")
  if (service_category) {
    dispatch(getServiceCategory(service_category))
  }
}, [])

const formHandler = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("serviceSubCategory",serviceSubCategory)
  formData.append("serviceName",serviceName)
  formData.append("price", JSON.stringify(price))
  formData.append("includes",  JSON.stringify(includes.split(", ")))
  formData.append("iconUrl", iconUrl)
  formData.append("imgUrl", imgUrl)
  dispatch(addService(formData));
  setServiceName("")
  setPrice([])
  setIncludes("")
};

useEffect(() => {
  if (success) {
    setAddServiceModal(false);
  }
}, [success]);

return (
  <>
  {loader ? <Loader /> : null}
    <Modal show={addServiceModal} onHide={() => setAddServiceModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>SERVICE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formHandler}>
          <Form.Group>
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            {singleServiceCategory.cities && <Table striped bordered hover>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Actual Price</th>
                  <th>Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                {singleServiceCategory.cities.map(o =>
                  <tr key={o._id}>
                    <td>{o.cityName}</td>
                    <td><div className="form-check">
                      <input className="form-control" required type="text" onChange={(e) => handleInputChange(o.cityId, o.cityName, "actualPrice", e.target.value)} id="defaultCheck1" />
                    </div></td>
                    <td><div className="form-check">
                      <input className="form-control" required type="text" onChange={(e) => handleInputChange(o.cityId, o.cityName, "discountedPrice", e.target.value)} id="defaultCheck1" />
                    </div></td>
                  </tr>
                )}
              </tbody>
            </Table>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Icon Picture</Form.Label>
            <Form.Control
              accept=".jpg,.png,.jpeg"
              onChange={iconUrlHandler}
              type="file"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              accept=".jpg,.png,.jpeg"
              onChange={imgUrlHandler}
              type="file"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Includes</Form.Label>
            <Form.Control value={includes} onChange={(e) => setIncludes(e.target.value)} as="textarea" rows={3} />
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

export default AddServiceModal;
