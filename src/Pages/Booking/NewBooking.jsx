import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button} from "react-bootstrap";
import { getNewBookings, adminCancelBooking } from "../../redux/actions/booking";
import {getServiceProviders} from '../../redux/actions/serviceProvider'
import AssignServiceProviderModal from '../../Components/Booking/AssignServiceProviderModal'
import Moment from 'react-moment';
import Loader from '../../Components/Loader'

const NewBooking = () => {
  const { newBookings, loader } = useSelector((store) => store.bookingRoot);
  const [currentBooking, setCurrentBooking] = useState({})
  const [assignServiceProviderModal, setAssignServiceProviderModal] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewBookings());
    dispatch(getServiceProviders());

  }, []);

  const clickHandler = (data)=>{
    setCurrentBooking({...data})
    setAssignServiceProviderModal(true)
  }

  const cancelHandler = (id)=>{
    if(!id) return
    dispatch(adminCancelBooking(id,()=>{
      window.location.reload()
    }))
  }
  return (
    <>
      {assignServiceProviderModal && <AssignServiceProviderModal currentBooking={currentBooking} assignServiceProviderModal={assignServiceProviderModal} setAssignServiceProviderModal={setAssignServiceProviderModal} />}
      <Container>
        <Row className="mt-5">
          <Col>
          {loader ? <Loader /> : <Table striped bordered hover>
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
                  <th className="text-center">Assign Customer</th>
                  <th className="text-center">Cancel Service</th>
                </tr>
              </thead>
              <tbody>
                {newBookings.length !== 0
                  ? newBookings.map((b, index) => (
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
                        {b.isServiceProviderAssigned ? <Button disabled={true}>Assigned</Button> : <Button onClick={()=>clickHandler(b)}>Choose ..</Button>}
                        </td>
                        <td><Button onClick={()=>cancelHandler(b._id)} variant="primary">Cancel Service</Button></td>
                      </tr>
                    ))
                  : <h5 className="text-center">Oops No new bookings found</h5>}
              </tbody>
            </Table> }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewBooking;
