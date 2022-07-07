import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { getCustomers } from "../../redux/actions/commonAction";
import Loader from '../../Components/Loader'
import { getCities } from '../../redux/actions/cityAction'
import moment from "moment";
import { apiAuth } from '../../config/constant'
import Fuse from 'fuse.js';

const Customer = () => {
  const reduxData = useSelector(store => store)
  const { cityRoot, root } = reduxData
  let { loader, customers } = root

  const [_customers, _setCustomers] = useState([])
  const [customer, setCustomer] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [city, setCity] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    let p = prompt('Enter Password:');
    if (p) {
      if (p == apiAuth["customer"]) {
        dispatch(getCustomers())
      }
      else {
        alert("Wrong password")
      }
    }
  }, [])

  useEffect(() => {
    // dispatch(getCustomers())
    dispatch(getCities())
  }, [])

  useEffect(()=>{
    const filteredData = customers.filter((d)=> d.cityName == city)
    _setCustomers(filteredData)
  },[city])

  useEffect(() => {
    _setCustomers(customers)
  }, [customers])

  useEffect(() => {
    const _customer = new Fuse(customers, {
      keys: ["name"]
    });
    let result = _customer.search(customer);

    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setCustomers(result)
    }
  }, [customer])

  useEffect(() => {
    const _customer = new Fuse(customers, {
      keys: ["phoneNumber"]
    });
    let result = _customer.search(phoneNumber);
    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setCustomers(result)
    }
  }, [phoneNumber])

  const refreshHandler = () => {
    _setCustomers(customers)
    setCustomer("")
    setPhoneNumber("")
  }

  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col md={2} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={2} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Phonenumber</Form.Label>
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={2} >
          <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>City</Form.Label>
              <Form.Control onChange={(e) => setCity(e.target.value)} as="select">
                <option>Select</option>
                {cityRoot.cities.length !== 0 ? cityRoot.cities.map(c =>
                  <option value={c.name}>{c.name}</option>
                ) : null}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2} >
            <Button onClick={refreshHandler}>Refresh</Button>
          </Col>
        </Row>
        {loader ? <Loader /> : <>
          {_customers.length === 0 ? <h5>No Customers Found</h5> : <>
            <Row className="mt-2">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({_customers.length})</th>
                      <th className="text-center">Joined On</th>
                      <th className="text-center">Customer Name</th>
                      <th className="text-center">Phone Number</th>
                      <th className="text-center">Service Booked</th>
                      <th className="text-center">Items In Cart</th>
                      <th className="text-center">City</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Default Address</th>
                      <th className="text-center">Last Service Booked Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_customers.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center"> {moment(a.createdAt).format("YYYY-MM-DD")}</td>
                        <td className="text-center">{a.name}</td>
                        <td className="text-center">{a.phoneNumber}</td>
                        <td className="text-center">{a.serviceBooked.length}</td>
                        <td className="text-center">{a.cart.length}</td>
                        <td className="text-center">{a.cityName}</td>
                        <td className="text-center">{a.email}</td>
                        <td className="text-center">{JSON.stringify(a.defaultAddress)}</td>
                        <td className="text-center">{JSON.stringify(a.lastServiceAddress)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>}
        </>}
      </Container>
    </>
  )
}

export default Customer
