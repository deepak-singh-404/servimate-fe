import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import {getRegistrationRequest, reviewRegistrationRequest} from '../../redux/actions/serviceProvider'

const RegistrationRequest = () => {
    const serviceProviderRoot = useSelector(store => store.serviceProviderRoot)
    const { loader, registrationRequest } = serviceProviderRoot
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRegistrationRequest())
    }, [])

    return (
        <>
            <Container fluid>
                <Row className="my-2">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No ({registrationRequest.length})</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Phone Number</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Experience</th>
                                    <th className="text-center">Services</th>
                                    <th className="text-center">Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrationRequest.length !== 0 ? registrationRequest.map((s, index) =>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{s.name}</td>
                                        <td className="text-center">{s.phoneNumber}</td>
                                        <td className="text-center">{s.city.name}</td>
                                        <td className="text-center">{s.experience}</td>
                                        <td className="text-center">{s.services.map(e => e).join(", ")}</td>
                                        <td className="text-center"><Button disabled={s.isReviewed} onClick={() => {
                                        <td className="text-center"></td>
                                            dispatch(reviewRegistrationRequest(s._id))
                                            // setButtonDisable(true)
                                        }}>Redeem</Button></td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default RegistrationRequest