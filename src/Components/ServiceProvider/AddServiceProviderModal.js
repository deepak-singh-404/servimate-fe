import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { addServiceProvider } from '../../redux/actions/serviceProvider'
import { getCities } from '../../redux/actions/cityAction'
import { getServiceCategories } from '../../redux/actions/serviceAction'

const AddServiceProviderModal = ({ addServiceProviderModal, setAddServiceProviderModal }) => {
    const reduxData = useSelector(store => store)
    const { cityRoot, serviceRoot, serviceProviderRoot } = reduxData
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [serviceCategory, setServiceCategory] = useState("")
    const [city, setCity] = useState("")
    const [remark, setRemark] = useState("")


    const formHandler = (e) => {
        e.preventDefault()
        if (name && phoneNumber  && serviceCategory && city) {
            const tempCity = cityRoot.cities.find(c => c._id == city)
            const tempServiceCategory = serviceRoot.serviceCategories.find(s => s._id == serviceCategory)
            const data = {
                name, email, phoneNumber, remark,
                serviceCategory: { _id: tempServiceCategory._id, name: tempServiceCategory.name },
                city: { _id: tempCity._id, name: tempCity.name },

            }
            dispatch(addServiceProvider(data, () => {
                setAddServiceProviderModal(false)
            }))
            setName("")
            setEmail("")
            setPhoneNumber("")
            setServiceCategory({})
            setCity({})
            setRemark("")
        }
        else {
            alert("Fields are empty")
            return
        }
    }

    useEffect(() => {
        dispatch(getCities())
        dispatch(getServiceCategories())
    }, [])

    return (
        <>
            <Modal show={addServiceProviderModal} onHide={() => setAddServiceProviderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>SERVICE PROVIDER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Name *</Form.Label>
                            <Form.Control required value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Service Category *</Form.Label>
                            <Form.Control required onChange={(e) => setServiceCategory(e.target.value)} as="select">
                                <option>Select</option>
                                {serviceRoot.serviceCategories.length !== 0 ? serviceRoot.serviceCategories.map(s =>
                                    <option value={s._id}>{s.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>City *</Form.Label>
                            <Form.Control required onChange={(e) => setCity(e.target.value)} as="select">
                                <option>Select</option>
                                {cityRoot.cities.length !== 0 ? cityRoot.cities.map(c =>
                                    <option value={c._id}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </Form.Group>
                        {/* <Form.Group >
                            <Form.Label>Experience</Form.Label>
                            <Form.Control required value={experience} onChange={(e) => setExperience(e.target.value)} type="number" />
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control value={remark} onChange={(e) => setRemark(e.target.value)} as="textarea" rows={3} />
                            <Form.Text className="text-muted">
                                Enter Remarks in below format
      <br />
      Proficient, ..., ...,
    </Form.Text>
                        </Form.Group>
                        {serviceProviderRoot.loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                </Button>}
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddServiceProviderModal