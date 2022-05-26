import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../redux/actions/dashboard";
import Loader from '../../Components/Loader'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
})


const Dashboard = () => {
    const { loader } = useSelector(state => state.dashboard)
    const [bookings, sbookings] = useState([])
    const [totalCustomers, stotalCustomers] = useState([])
    const [regularCustomers, sregularCustomers] = useState([])
    const [zbcustomers, szbcustomers] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBookings("booking", (r) => {
            sbookings(r)
        }))
        dispatch(getBookings("allCustomer", (r) => {
            stotalCustomers(r)
        }))
        dispatch(getBookings("regularCustomer", (r) => {
            sregularCustomers(r)
        }))
        dispatch(getBookings("customerZB", (r) => {
            szbcustomers(r)
        }))
    }, [])

    return (
        <>
            <Container fluid>
                {loader ? <Loader /> : <>
                    <Row className="mt-5 mx-auto">
                        <Card style={{ width: '15rem' }}>
                            <Card.Body>
                                <Card.Title className="text-danger">BOOKINGS</Card.Title>
                                <Card.Text>
                                    Total Bookings: {bookings.length > 0 && bookings[0]["count"]}
                                    <br></br>
                                    Amount: {bookings.length > 0 && formatter.format(bookings[0]["amount"])}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '15rem' }}>
                            <Card.Body>
                                <Card.Title className="text-success">CUSTOMERS</Card.Title>
                                <Card.Text>
                                    Total Customers: {totalCustomers.length > 0 && totalCustomers[0]["count"]}
                                    <br></br>
                                    Regular Customers: {regularCustomers.length > 0 && regularCustomers[0]["count"]}
                                    <br></br>
                                    Zero Bookings: {zbcustomers.length > 0 && zbcustomers[0]["count"]}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </>}

            </Container>
        </>
    )
}

export default Dashboard
