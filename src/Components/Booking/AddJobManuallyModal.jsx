import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { getServiceCategories, getServicesByServiceCategory } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';

const AddJobManuallyModal = ({ addManualJobModal, setAddManulJobModal }) => {
    const reduxData = useSelector(store => store)
    const { serviceRoot, serviceProviderRoot } = reduxData
    const { serviceCategories, services, loader } = serviceRoot
    const [serviceCategory, setServiceCategory] = useState("")
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (serviceCategories.length > 0 && serviceCategory) {
            dispatch(getServicesByServiceCategory(serviceCategory))
        }
    }, [serviceCategory])

    useEffect(() => {
        dispatch(getServiceCategories())
    }, [])

    return (
        <>
            <Modal show={addManualJobModal} onHide={() => setAddManulJobModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD JOB</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Service Category *</Form.Label>
                            <Form.Control required onChange={(e) => setServiceCategory(e.target.value)} as="select">
                                <option>Select</option>
                                {serviceCategories.length !== 0 ? serviceCategories.map(c =>
                                    <option value={c._id}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>

                        {/* {serviceProviderRoot.loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>} */}
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddJobManuallyModal