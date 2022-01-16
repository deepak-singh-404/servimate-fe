import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeStampHelper } from '../../utils/commonFunction'
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import {
  getCancellationRequest,
  approveCancellationRequest,
} from "../../redux/actions/booking";
import Loader from "../../Components/Loader";

const CancellationRequest = () => {
  const { cancellationRequests, loader } = useSelector(
    (store) => store.bookingRoot
  );
  const dispatch = useDispatch();

  const [isServiceProviderAssigned, setIsServiceProviderAssigned] =
    useState(false);

  useEffect(() => {
    dispatch(
      getCancellationRequest({
        isServiceProviderAssigned,
      })
    );
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(
      getCancellationRequest({
        isServiceProviderAssigned,
      })
    );
  };

  const clickHandler = (id) => {
    if (!id) return;
    dispatch(
      approveCancellationRequest(id, () => {
        window.location.reload();
      })
    );
  };
  return (
    <>
      <Container fluid className="mt-3">
        <Col md={2} className="m-auto">
          <Row>
            <Form className="d-flex" onSubmit={formHandler}>
              <FormControl
                onChange={(e) => setIsServiceProviderAssigned(e.target.value)}
                as="select"
                className="mr-2"
              >
                <option>Select</option>
                <option value={true}>Partner Assigned</option>
                <option value={false}>Need to Assign Partner</option>
              </FormControl>
              <Button type="submit" variant="outline-primary">
                Filter
              </Button>
            </Form>
          </Row>
        </Col>
        {loader ? (
          <Loader className="m-auto" />
        ) : (
          <Col className="mt-3" md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No</th>
                  <th className="text-center">Booking Id</th>
                  <th className="text-center">Cart Price</th>
                  <th className="text-center">Services</th>
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
                      <td className="text-center">{b.bookingId}</td>
                      <td className="text-center">{b.cartAmount}</td>
                      <td>
                        <tr>
                          <td>Service</td>
                          <td>Actual Price</td>
                          <td>Discounted Price</td>
                        </tr>
                        {b.services.map((d) => (
                          <tr>
                            <td>{d.serviceName}</td>
                            <td>{d.actualPrice}</td>
                            <td>{d.discountedPrice}</td>
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
                      <td className="text-center">{b.customer.name}</td>
                      <td>{b.serviceProviderName ? b.serviceProviderName : "NA" }</td>

                      <td>
                        <Button onClick={() => clickHandler(b._id)}>
                          Approve
                        </Button>
                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </Col>
        )}
      </Container>
    </>
  );
};

export default CancellationRequest;
