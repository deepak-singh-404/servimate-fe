import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getBookingHistory } from "../../redux/actions/booking";
import { timeStampHelper } from '../../utils/commonFunction'
import Loader from '../../Components/Loader'

const BookingHistory = () => {
  const { loader, bookingHistory } = useSelector((store) => store.bookingRoot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingHistory());
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="mt-5">
          <Col>
            {loader ? <Loader /> : <>
              {bookingHistory.length == 0 ? <h5>No Bookings Found</h5> :
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="text-center">
                          S.No ({bookingHistory.length})
                        </th>
                        <th className="text-center">Booking Id</th>
                        <th className="text-center">Customer Name</th>
                        <th className="text-center">SericeProvider Assigned</th>
                        <th className="text-center">Final Amount</th>
                        <th className="text-center">Cart Amount</th>
                        <th className="text-center">Amount Received By Partner</th>
                        <th className="text-center">Services</th>
                        <th className="text-center">Booking Date/Time</th>
                        <th className="text-center">Service Date (yyyy/mm/dd)</th>
                        <th className="text-center">Time Slot</th>
                        <th className="text-center">Mode Of Payment</th>
                        <th className="text-center">Pay</th>
                        <th className="text-center">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingHistory.length !== 0
                        ? bookingHistory.map((b, index) => (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{b.bookingId}</td>
                            <td className="text-center">{b.customer.name}</td>
                            <td className="text-center">{b.serviceProviderName || "CANCELLED"}</td>
                            <td className="text-center">{b.finalPrice}</td>
                            <td className="text-center">{b.cartAmount}</td>
                            <td className="text-center">{b.bookingJourney.amountPaidByCustomer}</td>

                            <td>
                              {b.services.map((d) => (
                                <tr>
                                  <td>{d.serviceName} ({d.discountedPrice})</td>
                                </tr>
                              ))}
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
                            <td className="text-center">{b.isFeedbackGivenByCustomer ? b.feedback : "NA"}</td>
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
