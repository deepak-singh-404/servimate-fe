import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { getBookingHistory } from "../../redux/actions/booking";
import { timeStampHelper } from '../../utils/commonFunction'
import { getCities } from '../../redux/actions/cityAction'
import Loader from '../../Components/Loader'
import Fuse from 'fuse.js';

const BookingHistory = () => {
  const { loader, bookingHistory } = useSelector((store) => store.bookingRoot);
  const cities = useSelector((store) => store.cityRoot.cities)
  const dispatch = useDispatch();

  const [_bookingHistory, _setbookingHistory] = useState([])
  const [fbookingId, fsetbookingId] = useState("")
  const [fcustomerName, fsetcustomerName] = useState("")
  const [fphoneNumber, fsetphoneNumber] = useState("+91")
  const [fserviceProvider, fsetserviceProvider] = useState("")
  const [fcancelled, fsetcancelled] = useState(false)
  const [city, setCity] = useState("")
  const [fcustomerFeedback, fsetcustomerFeedback] = useState(false)

  useEffect(() => {
    dispatch(getBookingHistory());
    dispatch(getCities())
  }, []);

  useEffect(() => {
    if (bookingHistory) {
      _setbookingHistory(bookingHistory)
    }
  }, [bookingHistory])

  //Filter As Per BookingId
  useEffect(() => {
    const _bookings = new Fuse(bookingHistory, {
      keys: ["bookingId"]
    });
    let result = _bookings.search(fbookingId);

    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setbookingHistory(result)
    }
  }, [fbookingId])


  //Filter As Per Customer Name
  useEffect(() => {
    const _bookings = new Fuse(bookingHistory, {
      keys: ["customer.name"]
    });
    let result = _bookings.search(fcustomerName);

    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setbookingHistory(result)
    }
  }, [fcustomerName])


  //Filter As Per Phone Number
  useEffect(() => {
    const _bookings = new Fuse(bookingHistory, {
      keys: ["customer.phoneNumber"]
    });
    let result = _bookings.search(fphoneNumber);

    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setbookingHistory(result)
    }
  }, [fphoneNumber])


  //Filter As Per Service Provider
  useEffect(() => {
    const _bookings = new Fuse(bookingHistory, {
      keys: ["serviceProviderName"]
    });
    let result = _bookings.search(fserviceProvider);

    if (result && result.length > 0) {
      result = result.map(a => a.item)
      _setbookingHistory(result)
    }
  }, [fserviceProvider])

  //Filter As Per City
  useEffect(() => {
    if (city == "Select" || city == "") {
      _setbookingHistory(bookingHistory)
    }
    else {
      const filteredData = bookingHistory.filter((b) => b?.customerId?.cityName == city)
      _setbookingHistory(filteredData)
    }
  }, [city])

  //Filter As Per Customer Feedback
  useEffect(() => {
    if (fcustomerFeedback) {
      const filteredData = bookingHistory.filter((b) => b.isFeedbackGivenByCustomer == true)
      _setbookingHistory(filteredData)
    }
    else {
      _setbookingHistory(bookingHistory)
    }

  }, [fcustomerFeedback])

  useEffect(() => {
    if (fcancelled) {
      const filteredData = bookingHistory.filter((b) => b.isCancelled == true)
      _setbookingHistory(filteredData)
    }
    else {
      _setbookingHistory(bookingHistory)
    }

  }, [fcancelled])

  const refreshHandler = () => {
    
    _setbookingHistory(bookingHistory)
  }

  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col md={1} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Booking Id</Form.Label>
                <Form.Control
                  value={fbookingId}
                  onChange={(e) => fsetbookingId(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={1} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  value={fcustomerName}
                  onChange={(e) => fsetcustomerName(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={1} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={fphoneNumber}
                  onChange={(e) => fsetphoneNumber(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={1} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Service Provider</Form.Label>
                <Form.Control
                  value={fserviceProvider}
                  onChange={(e) => fsetserviceProvider(e.target.value)}
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
                {cities.length !== 0 ? cities.map(c =>
                  <option value={c.name}>{c.name}</option>
                ) : null}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={1} >
            <Button variant="outline-info" onClick={() => fsetcustomerFeedback(!fcustomerFeedback)}>{fcustomerFeedback ? "Revert" : "Customer Feedbacks"}</Button>
          </Col>
          <Col md={1} >
            <Button variant="outline-info" onClick={() => fsetcancelled(!fcancelled)}>{fcancelled ? "Revert" : "Cancelled"}</Button>
          </Col>
          <Col md={2} >
            <Button onClick={refreshHandler}>Refresh</Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            {loader ? <Loader /> : <>
              {_bookingHistory.length == 0 ? <h5>No Bookings Found</h5> :
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="text-center">
                          S.No ({_bookingHistory.length})
                        </th>
                        <th className="text-center">Booking Id</th>
                        <th className="text-center">Customer Name</th>
                        <th className="text-center">Phone Number</th>
                        <th className="text-center">City</th>
                        <th className="text-center">SericeProvider Assigned</th>
                        <th className="text-center">Final Amount</th>
                        <th className="text-center">Coupon Code</th>
                        <th className="text-center">Amount Received By Partner</th>
                        <th className="text-center">Service Category</th>
                        <th className="text-center">Services</th>
                        <th className="text-center">Service Date (yyyy/mm/dd)</th>
                        <th className="text-center">Mode Of Payment</th>
                        <th className="text-center">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {_bookingHistory.length !== 0
                        ? _bookingHistory.map((b, index) => (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{b.bookingId}</td>
                            <td className="text-center">{b.customer.name}</td>
                            <td className="text-center">{b.customer.phoneNumber}</td>
                            <td className="text-center">{b?.customerId?.cityName || "N.A"}</td>
                            <td className="text-center">{b.serviceProviderName || "CANCELLED"}</td>
                            <td className="text-center">{b.finalPrice.toFixed(2)}</td>
                            <td className="text-center">{b.coupon?.name || "N.A"}</td>
                            <td className="text-center">{b.bookingJourney.amountPaidByCustomer}</td>
                            <td className="text-center">{b.serviceCategoryId?.name}</td>
                            <td>
                              {b.services.map((d) => (
                                <tr>
                                  <td>{d.serviceName} ({d.discountedPrice})</td>
                                </tr>
                              ))}
                            </td>
                            <td className="text-center">{b.serviceDate}</td>
                            <td className="text-center">{b.modeOfPayment}</td>
                            <td className="text-center">{b.isFeedbackGivenByCustomer && b.customerReview?.rating + " " + b.customerReview?.message}</td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </Table>
                </>
              }
            </>}

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingHistory;
