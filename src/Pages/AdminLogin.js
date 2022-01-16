import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminLogin } from '../redux/actions/adminAction'
import { healthCheck } from '../redux/actions/booking'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'


//Component
import Loader from '../Components/Loader'


const AdminLogin = () => {
    const dispatch = useDispatch()
    const data = useSelector((store) => store.adminRoot)
    const history = useHistory()

    const { loader } = data

    const [admin, setAdmin] = useState({
        password: "",
        phoneNumber: "",
    })

    useEffect(() => {
        if (data.isAuthenticated) {
            history.push('/booking/new')
        }
        dispatch(healthCheck())
    }, [])

    const formHandler = (e) => {
        e.preventDefault()
        if (admin.password && admin.phoneNumber) {
            dispatch(adminLogin(admin, history))
        }
        else {
            alert("Fields are Empty")
        }
    }

    return (<Container >
        <Row className="mx-auto my-auto">
            <Col md={5} className="my-auto">
                <h5 className="text-center">WELCOME TO SERVIMATE</h5>
                <Form onSubmit={formHandler}>
                    <Form.Group >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control value={admin.phoneNumber} onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })} type="text" placeholder="Enter Phone Number" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} type="password" placeholder="Enter password" />
                    </Form.Group>
                    {loader ? <Loader /> : <Button variant="outline-primary" type="submit">
                        Submit
                    </Button>}
                </Form>
            </Col>
        </Row>
    </Container>)
}

export default AdminLogin