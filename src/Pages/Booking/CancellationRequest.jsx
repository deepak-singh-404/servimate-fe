import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { getCancellationRequest } from "../../redux/actions/booking";
import Moment from "react-moment";
import Loader from '../../Components/Loader'

const CancellationRequest = () => {
  const { cancellationRequests, loader } = useSelector((store) => store.bookingRoot);
  const dispatch = useDispatch();


  const [isServiceProviderAssigned, setIsServiceProviderAssigned] = useState(true)

  useEffect(() => {
    dispatch(
      getCancellationRequest({
        isServiceProviderAssigned
      })
    );
  }, []);

  const formHandler = (e)=>{
    e.preventDefault()
    dispatch(
      getCancellationRequest({
        isServiceProviderAssigned
      })
    );
  }
  return (
    <>
      <Container className="mt-3">
        <Col md={2} className="m-auto">
          <Row>
            <Form className="d-flex" onSubmit={formHandler}>
              <FormControl onChange={(e)=>setIsServiceProviderAssigned(e.target.value)}  as="select" className="mr-2">
                <option>Select</option>
                <option value={true} >Partner Assigned</option>
                <option value={false} >Need to Assign Partner</option>
              </FormControl>
              <Button type="submit" variant="outline-primary">Filter</Button>
            </Form>
          </Row>
        </Col>
        {loader ? <Loader className="m-auto"/> :
        <Col className="mt-3" md={12}>
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
            {cancellationRequests.length !== 0
              ? cancellationRequests.map((b, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{b.serviceName}</td>
                    <td className="text-center">{b.price}</td>
                    <td className="text-center">
                      <Moment>{b.timeOfBooking}</Moment>
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
                    <td className="text-center">{b.customerName}</td>
                    <td>{b.serviceProviderName}</td>
                    <td><Button>Approve</Button></td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Col> }
        
      </Container>
    </>
  );
};

export default CancellationRequest;
