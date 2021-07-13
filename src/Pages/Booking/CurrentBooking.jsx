import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button} from "react-bootstrap";
import { getCurrentBookings } from "../../redux/actions/booking";

const CurrentBooking = () => {
  const { currentBookings } = useSelector((store) => store.bookingRoot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentBookings());
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
                {currentBookings.length !== 0
                  ? currentBookings.map((b, index) => (
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{b.serviceName}</td>
                        <td className="text-center">{b.price}</td>
                        <td className="text-center">{b.timeOfBooking}</td>
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

export default CurrentBooking;
