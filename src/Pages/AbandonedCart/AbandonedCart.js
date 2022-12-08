import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Form, Button, NavDropdown } from "react-bootstrap";
import { getAbandonedCart, reviewAdminAction } from "../../redux/actions/commonAction";
import Loader from "../../Components/Loader";

import downloadData from '../../utils/xlsx'


const Abandoned = () => {
  const { loader, abandonedCart } = useSelector(store => store.root)
  const dispatch = useDispatch()
  const [review, setReview] = useState("")
  const [_abandonedCart, _setabandonedCart] = useState([])
  const [reviewFilter, setReviewFilter] = useState("")

  useEffect(() => {
    dispatch(getAbandonedCart())
  }, [])

  useEffect(() => {
    _setabandonedCart(abandonedCart)
  }, [abandonedCart])

  const refreshHandler = () => {
    _setabandonedCart(abandonedCart)
  }

  useEffect(() => {
    if (["reviewed", "unreviewed"].includes(reviewFilter)) {
      if (reviewFilter == "reviewed") {
        const filteredData = abandonedCart.filter((a) => a?.adminActions?.abandonedCartReview)
        _setabandonedCart(filteredData)
      }
      if (reviewFilter == "unreviewed") {
        const filteredData = abandonedCart.filter((a) => !a?.adminActions?.abandonedCartReview)
        _setabandonedCart(filteredData)
      }
    }
  }, [reviewFilter])

  const downloadHandler = () => {
    let data = _abandonedCart.map((d) => {
      return {
        "Customer": d.name,
        "City": d.cityName,
        "PhoneNumber": d.phoneNumber,
        "Cart": d.cart.length
      }
    })
    downloadData("AbandonedCart.xlsx", data)
  }

  //Whatsapp Handler
  const whatsappHandler = (number) => {
    window.location.href = 'http://wa.me/' + number
  }

  //Review Action
  const reviewAction = (d, index) => {
    index = index.toString()
    if (!d.customerId || !d.actionKey || !d.actionValue || !index) {
      alert("Fields Are Empty.")
      return
    }
    dispatch(reviewAdminAction(d, index))
  }
  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col md={1} >
            <Form >
              <Form.Group >
                <Form.Label>Admin Review</Form.Label>
                <Form.Control required onChange={(e) => setReviewFilter(e.target.value)} as="select">
                  <option>Select </option>
                  <option value="reviewed">Reviewed</option>
                  <option value="unreviewed">Unreviewed</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={1} >
            <Button onClick={refreshHandler}>Refresh</Button>
          </Col>
          <Col md={2} >
            <Button variant="danger" type="button" onClick={downloadHandler}>Export Data</Button>
          </Col>
        </Row>
        <Row >
          {loader ? <Loader /> : <>
            {_abandonedCart.length === 0 ? <h5>No Customers Found</h5> : <>
              <Col >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({_abandonedCart.length})</th>
                      <th className="text-center"> Actions</th>
                      <th className="text-center">Customer Name</th>
                      <th className="text-center">Phone Number</th>
                      <th className="text-center">City</th>
                      <th className="text-center">Last Item Added At</th>
                      <th className="text-center">Items In Cart</th>
                      <th className="text-center">Items</th>
                      <th className="text-center">Address</th>
                      <th className="text-center">Admin Review</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_abandonedCart.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          <Button variant='info' onClick={() => whatsappHandler(a.phoneNumber)} type="button">
                            WHATSAPP
                          </Button>
                        </td>
                        <td className="text-center">{a.name}</td>
                        <td className="text-center">{a.phoneNumber}</td>
                        <td className="text-center">{a.cityName}</td>
                        <td className="text-center">{a.cart[a.cart.length - 1].createdAt && new Date(a.cart[a.cart.length - 1].createdAt).toISOString().slice(0, 10)}</td>
                        <td className="text-center">{a.cart.length}</td>
                        <td className="text-center">{a.cart.map(o => <>{o.serviceName} <br /></>)}</td>
                        <td className="text-center">{JSON.stringify(a.defaultAddress)}</td>
                        <td className="text-center">{a?.adminActions?.abandonedCartReview}</td>
                        <td >
                          <Form>
                            <Form.Group>
                              <Form.Control
                                placeholder="Review"
                                onChange={(e) => setReview(e.target.value)}
                                type="text"
                              />
                            </Form.Group>
                          </Form>
                          <Button onClick={() => reviewAction({
                            "customerId": a._id,
                            "actionKey": "abandonedCartReview",
                            "actionValue": review
                          }, index)} variant="primary" type="button">+</Button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </Col>
            </>}
          </>}
        </Row>
      </Container>
    </>
  )
}

export default Abandoned



