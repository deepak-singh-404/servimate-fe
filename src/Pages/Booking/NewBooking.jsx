import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import {
  getNewBookings,
  adminCancelBooking,
} from "../../redux/actions/booking";
import { getServiceProviders } from "../../redux/actions/serviceProvider";
import AssignServiceProviderModal from "../../Components/Booking/AssignServiceProviderModal";
import Loader from "../../Components/Loader";
import { timeStampHelper } from '../../utils/commonFunction'

const NewBooking = () => {
  const { newBookings, loader } = useSelector((store) => store.bookingRoot);
  const [currentBooking, setCurrentBooking] = useState({});
  const [assignServiceProviderModal, setAssignServiceProviderModal] =
    useState(false);
  const [bookings, setBookings] = useState([])
  const [date, setDate] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    setBookings(newBookings)
  }, [newBookings])

  useEffect(() => {
    if (date) {
      let tempData = newBookings.filter(o => o.serviceDate == date)
      setBookings(tempData)
    }
    if (bookingId) {
      let tempData = newBookings.filter(o => o.bookingId == bookingId)
      setBookings(tempData)
    }
    if (customerName) {
      let tempData = newBookings.filter(o => o.customer.name == customerName)
      setBookings(tempData)
    }
  }, [date, bookingId, customerName])


  useEffect(() => {
    dispatch(getNewBookings());
    dispatch(getServiceProviders());
  }, []);

  const clickHandler = (data) => {
    setCurrentBooking({ ...data });
    setAssignServiceProviderModal(true);
  };

  const cancelHandler = (id) => {
    if (!id) return;
    dispatch(
      adminCancelBooking(id, () => {
        window.location.reload();
      })
    );
  };

  const refreshHandler = () => {
    setBookings(newBookings)
    setBookingId("")
    setDate("")
    setCustomerName("")
  }
  return (
    <>
      {assignServiceProviderModal && (
        <AssignServiceProviderModal
          currentBooking={currentBooking}
          assignServiceProviderModal={assignServiceProviderModal}
          setAssignServiceProviderModal={setAssignServiceProviderModal}
        />
      )}
      <Container fluid>
        <Row className="mt-2">
          <Col md={2} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label> Service Date</Form.Label>
                <Form.Control
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={2} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>BookingId</Form.Label>
                <Form.Control
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={2} >
            <Form className="d-flex">
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={2} >
            <Button onClick={refreshHandler}>Refresh</Button>
          </Col>
        </Row>
        {loader ? <Loader /> : <>
          {newBookings.length === 0 ? <h5>No Bookings Found</h5> :
            <>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({bookings.length})</th>
                      <th className="text-center">Booking Id</th>
                      <th className="text-center">Customer Name</th>
                      <th className="text-center">Final Amount</th>
                      <th className="text-center">Cart Amount</th>
                      <th className="text-center">Services
                        <tr>
                          <td>Service (Price)</td>
                        </tr>
                      </th>
                      <th className="text-center">Address</th>
                      <th className="text-center">Booking time</th>
                      <th className="text-center">Service Date (yyyy/mm/dd)</th>
                      <th className="text-center">Time Slot</th>
                      <th className="text-center">Mode Of Payment</th>
                      <th className="text-center">Pay</th>
                      <th className="text-center">Assign Customer</th>
                      <th className="text-center">Cancel Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, index) => (
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{b.bookingId}</td>
                        <td className="text-center">{b.customer.name}</td>
                        <td className="text-center">{b.finalPrice}</td>
                        <td className="text-center">{b.cartAmount}</td>
                        <td>
                          {b.services.map(d =>
                            <tr>
                              <td>{d.serviceName} ({d.discountedPrice})</td>
                            </tr>
                          )}
                        </td>
                        <td>
                          <tr>
                            <td>{b.address.name}</td>
                            <td>{b.address.phoneNumber}</td>
                            <td>{b.address.houseNo}</td>
                            <td>{b.address.landmark}</td>
                            <td>{b.address.zipcode}</td>
                            <td>{b.address.city}</td>
                          </tr>
                        </td>
                        <td className="text-center">
                          {timeStampHelper(b.createdAt)["date"] + " / " + timeStampHelper(b.createdAt)["time"]}
                        </td>
                        <td className="text-center">{b.serviceDate}</td>
                        <td className="text-center">{b.timeSlot}</td>
                        <td className="text-center">{b.modeOfPayment}</td>
                        <td className="text-center">
                          {b.isPaid ? (
                            <strong>Paid</strong>
                          ) : (
                            <string>Pending</string>
                          )}
                        </td>
                        <td>
                          {b.isServiceProviderAssigned ? (
                            <Button disabled={true}>Assigned</Button>
                          ) : (
                            <Button onClick={() => clickHandler(b)}>
                              Choose ..
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() => cancelHandler(b._id)}
                            variant="primary"
                          >
                            Cancel Service
                          </Button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </Col>
            </>
          }
        </>}
      </Container>
    </>
  );
};

export default NewBooking;
