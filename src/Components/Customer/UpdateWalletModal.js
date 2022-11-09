import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap'
import Loader from "../Loader";
import { updateCustomerWallet } from "../../redux/actions/commonAction";

const UpdateWalletModal = ({ updateWalletModal, setUpdateWalletModal, customerInfo }) => {
    const [amount, setAmount] = useState(customerInfo.walletAmount)
    const [message, setMessage] = useState("")
    const [validUpto, setValidUpto] = useState("30")
    const dispatch = useDispatch();
    const { loader } = useSelector(store => store.root)


    const formHandler = async (e) => {
        e.preventDefault();
        dispatch(updateCustomerWallet({
            customerId: customerInfo._id,
            amount: Number(amount),
            message,
            validUpto: Number(validUpto)
        }, () => {
            setUpdateWalletModal(false)
        }));
    }
    return (
        <div>
            <Modal
                show={updateWalletModal}
                onHide={() => setUpdateWalletModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE CUSTOMER WALLET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group>
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                disabled
                                value={customerInfo.name}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Validity</Form.Label>
                            <Form.Control
                                value={validUpto}
                                onChange={(e) => setValidUpto(e.target.value)}
                                type="text"
                            />
                        </Form.Group>
                        {loader ? (
                            <Loader />
                        ) : (
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdateWalletModal
