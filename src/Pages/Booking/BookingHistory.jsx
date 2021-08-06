import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table} from "react-bootstrap";
import { getBookingHistory, setServices } from "../../redux/actions/booking";
import Moment from 'react-moment';


const BookingHistory = () => {
  const { bookingHistory } = useSelector((store) => store.bookingRoot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingHistory())
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No</th>
                  <th className="text-center">Service</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Booking time</th>
                  <th className="text-center">Service Date (yyyy/mm/dd)</th>
                  <th className="text-center">Time Slot</th>
                  <th className="text-center">Mode Of Payment</th>
                  <th className="text-center">Pay</th>
                  <th className="text-center">Customer Name</th>
                  <th className="text-center">SericeProvider Assigned</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.length !== 0
                  ? bookingHistory.map((b, index) => (
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{b.serviceName}</td>
                        <td className="text-center">{b.price}</td>
                        <td className="text-center"><Moment>{b.timeOfBooking}</Moment></td>
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
                        <td className="text-center">{b.customerName}</td>
                        <td> 
                         {b.serviceProviderName}
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
  );
};

export default BookingHistory;
