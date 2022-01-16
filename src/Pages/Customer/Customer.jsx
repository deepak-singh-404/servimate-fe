import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getCustomers } from "../../redux/actions/commonAction";
import Loader from '../../Components/Loader'

const Customer = () => {
  const { loader, customers } = useSelector(store => store.root)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  return (
    <>
      <Container fluid>
        {loader ? <Loader /> : <>
          {customers.length === 0 ? <h5>No Customers Found</h5> : <>
            <Row className="mt-2">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({customers.length})</th>
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
                    {customers.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
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
