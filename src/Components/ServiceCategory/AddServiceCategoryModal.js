import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal, Table } from "react-bootstrap";
import { addServiceCategory } from "../../redux/actions/serviceAction";
import { getCities } from '../../redux/actions/cityAction'
import Loader from "../Loader";


const AddServiceCategoryModal = ({
  addServiceCategoryModal,
  setAddServiceCategoryModal,
}) => {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [minAmountForCheckout, setMinAmountForCheckout] = useState(0)
  const dispatch = useDispatch();

  const { cities } = useSelector((store) => store.cityRoot)
  const serviceRoot = useSelector((store) => store.serviceRoot);
  const { loader, success } = serviceRoot;
  const [checkedCity, setCheckedCity] = useState([])


  const handleInputChange = (e) => {
    const tempCheck = checkedCity
    let index
    if (e.target.checked) {
      tempCheck.push(e.target.value)
    }
    else {
      index = tempCheck.indexOf(e.target.value)
      tempCheck.splice(index, 1)
    }
    setCheckedCity(tempCheck)
  }


  useEffect(() => {
    dispatch(getCities())
  }, [])

  useEffect(() => {
    if (success) {
      setAddServiceCategoryModal(false);
      setName("")
      setIconUrl("")
    }
  }, [success]);

  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setIconUrl(img);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (iconUrl !== "") {
      formData.append("iconUrl", iconUrl);
    }
    formData.append("cities", checkedCity)
    formData.append("minAmountForCheckout", minAmountForCheckout)
    dispatch(addServiceCategory(formData));
    setName("")
    setMinAmountForCheckout(0)
    setCheckedCity([])
  }

  return (
    <>
      <Modal
        show={addServiceCategoryModal}
        onHide={() => setAddServiceCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>SERVICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label>SERVICE-CATEGORY NAME</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>MIN AMOUNT FOR CHECKOUT</Form.Label>
              <Form.Control
                value={minAmountForCheckout}
                onChange={(e) => setMinAmountForCheckout(e.target.value)}
                type="number"
              />
            </Form.Group>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td><div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  </div></td>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {
                  cities.map((obj, index) =>
                    <tr>
                      <td><div className="form-check">
                        <input className="form-check-input" type="checkbox" value={obj._id} onChange={handleInputChange} id="defaultCheck1" />
                      </div></td>
                      <td key={index}>{obj.name}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
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

export default AddServiceCategoryModal;
