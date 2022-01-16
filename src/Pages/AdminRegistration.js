import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'


//Component
import Loader from '../Components/Loader'


const AdminRegistration = () => {
    const data = useSelector((store) => store.adminRoot)
    const { loader } = data
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    })
    const formHandler = (e) => {
        e.preventDefault()
    }
    return (
        <Container >
            <Row className="mt-5">
                <Col md={8} className="m-auto">
                    <h1>WELCOME TO SERVIMATE</h1>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={admin.name} onChange={(e) => setAdmin({ ...admin, name: e.target.value })} type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={admin.phoneNumber} onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })} type="text" placeholder="Enter PhoneNumber" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} type="password" placeholder="Enter password" />
                        </Form.Group>
                        {/* <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}
                        {loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminRegistration