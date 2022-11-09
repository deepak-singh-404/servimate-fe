import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import { addReferAndEarnConfig } from '../../redux/actions/commonAction'
import Loader from '../Loader'

const AddReferAndEarnModal = ({ addModal, setAddModal }) => {
    const cityData = useSelector(store => store.cityRoot)
    const { loader, success } = cityData
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [discountType, setDiscountType] = useState("INR")
    const [referredByShare, setReferredByShare] = useState("")
    const [referralShare, setReferralShare] = useState("")
    const [referralAmount, setReferralAmount] = useState("")
    const [validity, setValidity] = useState("30")

    const formHandler = (e) => {
        e.preventDefault()
        if (startDate && endDate && discountType && referredByShare && referralShare && referralAmount && validity) {
            dispatch(addReferAndEarnConfig({
                startDate, endDate, discountType,
                referredByShare: Number(referredByShare),
                referralShare: Number(referralShare),
                referralAmount: Number(referralAmount),
                validity: Number(validity)
            }, () => {
                setAddModal(false)
            }))
        }
        else {
            alert("Fields  should not be empty")
        }
    }

    return (
        <>
            <Modal show={addModal} onHide={() => setAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>REFER AND EARN CONFIG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control value={startDate} onChange={(e) => setStartDate(e.target.value)} type="text" placeholder="YYYY-MM-DD" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>End Date</Form.Label>
                            <Form.Control value={endDate} onChange={(e) => setEndDate(e.target.value)} type="text" placeholder="YYYY-MM-DD" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Discount Type</Form.Label>
                            <Form.Text className="text-muted">
                                PERCENTAGE / INR
                            </Form.Text>
                            <Form.Control value={discountType} onChange={(e) => setDiscountType(e.target.value)} type="text" placeholder="PERCENTAGE / INR" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>ReferredBy Share</Form.Label>
                            <Form.Control value={referredByShare} onChange={(e) => setReferredByShare(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Referral Share</Form.Label>
                            <Form.Control value={referralShare} onChange={(e) => setReferralShare(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Referal Amount</Form.Label>
                            <Form.Control value={referralAmount} onChange={(e) => setReferralAmount(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Validity</Form.Label>
                            <Form.Control value={validity} onChange={(e) => setValidity(e.target.value)} type="text" />
                        </Form.Group>
                        {loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddReferAndEarnModal