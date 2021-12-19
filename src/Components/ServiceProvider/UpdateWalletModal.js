import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { partnerWalletActionTypes } from '../../config/constant'
import {updatePartnerWallet} from '../../redux/actions/serviceProvider'



const UpdateWalletModal = ({ updateWalletModal, setUpdateWalletModal, partnerId }) => {
    const loader = useSelector(store => store.serviceProviderRoot.loader)
    const [type, setType] = useState("")
    const [amount, setAmount] = useState("")
    const dispatch = useDispatch()

    const formHandler = (e) => {
        e.preventDefault()
        if (!type || !amount) {
            alert("Fields are empty.")
            return
        }
        const data = { type, amount:Number(amount)}
        dispatch(updatePartnerWallet(partnerId,data, ()=>{
           setUpdateWalletModal(false)
        }))
    }

    return (
        <>
            <Modal show={updateWalletModal} onHide={() => setUpdateWalletModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>WALLET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>

                        <Form.Group >
                            <Form.Label>Action</Form.Label>
                            <Form.Control required onChange={(e) => setType(e.target.value)} as="select">
                                <option>Select</option>
                                {partnerWalletActionTypes.map(d => 
                                    <option value={d[Object.keys(d)[0]]}>{Object.keys(d)[0]}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control required value={amount} onChange={(e) => setAmount(e.target.value)} type="text" />
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

export default UpdateWalletModal