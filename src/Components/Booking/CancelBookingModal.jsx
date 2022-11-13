import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { adminCancelBooking } from '../../redux/actions/booking'

const CancelBookingModal = ({ cancelBookingModal, setCancelBookingModal, booking }) => {
    const { loader } = useSelector((store) => store.bookingRoot);
    const dispatch = useDispatch()
    const [reason, setReason] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(adminCancelBooking({
            "bookingId": booking._id,
            "reason": reason
        }, () => {
            setCancelBookingModal(false)
            //window.location.reload(true);
        }))
    }

    return (
        <div>
            <Modal show={cancelBookingModal} onHide={() => setCancelBookingModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>CANCEL BOOKING ({booking.bookingId})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control value={booking?.customer?.name} disabled={true} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Reason</Form.Label>
                            <Form.Control required value={reason} onChange={(e) => setReason(e.target.value)} type="text" />
                        </Form.Group>
                        {loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default React.memo(CancelBookingModal);
