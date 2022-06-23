import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { getAbandonedCart, reviewAdminAction } from "../../redux/actions/commonAction";
import Loader from "../../Components/Loader";


const Abandoned = () => {
  const { loader, abandonedCart } = useSelector(store => store.root)
  const dispatch = useDispatch()
  const [review, setReview] = useState("")
  useEffect(() => {
    dispatch(getAbandonedCart())
  }, [])

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
        <Row >
          {loader ? <Loader /> : <>
            {abandonedCart.length === 0 ? <h5>No Customers Found</h5> : <>
              <Col >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({abandonedCart.length})</th>
                      <th className="text-center">Customer Name</th>
                      <th className="text-center">Phone Number</th>
                      <th className="text-center">Last Item Added At</th>
                      <th className="text-center">Items In Cart</th>
                      <th className="text-center">Items</th>
                      <th className="text-center">Address</th>
                      <th className="text-center">Admin Review</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abandonedCart.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{a.name}</td>
                        <td className="text-center">{a.phoneNumber}</td>
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



