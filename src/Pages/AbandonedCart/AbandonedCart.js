import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Card, ListGroup } from "react-bootstrap";
import { getAbandonedCart } from "../../redux/actions/commonAction";


const Abandoned = () => {
  const { loader, abandonedCart } = useSelector(store => store.root)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAbandonedCart())
  }, [])

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col md={10} className='m-auto'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No</th>
                  <th className="text-center">Customer Name</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Items In Cart</th>
                  <th className="text-center">Address</th>
                </tr>
              </thead>
              <tbody>
                {abandonedCart.length !== 0
                  ? abandonedCart.map((a, index) => (
                    <tr key={a._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{a.name}</td>
                      <td className="text-center">{a.phoneNumber}</td>
                      <td className="text-center">{a.cart.length}</td>
                      <td>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th className="text-center">Name</th>
                              <th className="text-center">Phone Number</th>
                              <th className="text-center">Address</th>
                              <th className="text-center">Zipcode</th>
                              <th className="text-center">City</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{a.defaultAddress.name}</td>
                              <td className="text-center">{a.defaultAddress.phoneNumber}</td>
                              <td className="text-center">{a.defaultAddress.address}</td>
                              <td className="text-center">{a.defaultAddress.zipcode}</td>
                              <td className="text-center">{a.defaultAddress.city}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Abandoned



