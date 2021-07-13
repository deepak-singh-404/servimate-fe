import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Card, ListGroup } from "react-bootstrap";
import { getCustomers } from "../../redux/actions/commonAction";

const Customer = () => {
    const { loader, customers } = useSelector(store => store.root)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCustomers())
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
                    <th className="text-center">Service Booked</th>
                    <th className="text-center">Items In Cart</th>
                    <th className="text-center">Email</th>
                    {/* <th className="text-center">Address</th> */}
                  </tr>
                </thead>
                <tbody>
                  {customers.length !== 0
                    ? customers.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{a.name}</td>
                        <td className="text-center">{a.phoneNumber}</td>
                        <td className="text-center">{a.serviceBooked.length}</td>
                        <td className="text-center">{a.cart.length}</td>
                        <td className="text-center">{a.email}</td>
                        {/* <td>
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
                        </td> */}
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

export default Customer
