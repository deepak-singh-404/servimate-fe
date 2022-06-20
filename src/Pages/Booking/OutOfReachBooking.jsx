import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getOutOfReachBookings } from "../../redux/actions/booking";
import Loader from "../../Components/Loader";

const NewBooking = () => {
    const { outOfReachBookings, loader } = useSelector((store) => store.bookingRoot);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOutOfReachBookings())
    }, []);

    return (
        <>
            <Container fluid>
                <Row className="mt-5">
                    <Col>
                        {loader ? <Loader /> : <>
                            {outOfReachBookings.length == 0 ? <h5>No Bookings Found</h5> :
                                <>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="text-center">
                                                    S.No ({outOfReachBookings.length})
                                                </th>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">Phone Number</th>
                                                <th className="text-center">Tried At</th>
                                                <th className="text-center">Service Date</th>
                                                <th className="text-center">Address</th>
                                                <th className="text-center">Cart</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {outOfReachBookings.length !== 0
                                                ? outOfReachBookings.map((b, index) => (
                                                    <tr>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td className="text-center">{b?.reqPayload?.customerId?.name}</td>
                                                        <td className="text-center">{b?.reqPayload?.customerId?.phoneNumber}</td>
                                                        <td className="text-center">{b.createdAt && new Date(b.createdAt).toISOString().slice(0, 10)}</td>
                                                        <td className="text-center">{b.reqPayload.serviceDate}</td>
                                                        <td className="text-center">{JSON.stringify(b.reqPayload.address)}</td>
                                                        <td className="text-center">{JSON.stringify(b.customer.cart)}</td>
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

export default NewBooking;
