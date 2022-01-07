import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { updateServiceProvider } from '../../redux/actions/serviceProvider'
import { getCities } from '../../redux/actions/cityAction'
import { getServiceCategories } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';

const UpdateServiceProviderModal = ({ updateServiceProviderModal, setUpdateServiceProviderModal, previousData }) => {
    const reduxData = useSelector(store => store)
    const { cityRoot, serviceRoot, serviceProviderRoot } = reduxData
    const dispatch = useDispatch()
    const [name, setName] = useState(previousData.name ? previousData.name : "")
    const [email, setEmail] = useState(previousData.email ? previousData.email : "")
    const [phoneNumber, setPhoneNumber] = useState(previousData.phoneNumber ? previousData.phoneNumber : "")
    const [serviceCategory, setServiceCategory] = useState(previousData.serviceCategoryId ? previousData.serviceCategoryId : [])
    const [previousCity, setPreviousCity] = useState(previousData.cityName ? previousData.cityName : "")
    const [city, setCity] = useState("")
    const [remark, setRemark] = useState(previousData.remark ? previousData.remark : "")
    const [imgUrl, setImgUrl] = useState("");
    const [pinCodes, setPincodes] = useState(previousData.zipcodes ? previousData.zipcodes.join(", ") : [])

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImgUrl(img);
        }
    };

    const formHandler = (e) => {
        e.preventDefault()
        // MAKE SURE REQUIRED FIEDS ARE NOT EMPTY
        if (name && email && phoneNumber && serviceCategory.length > 0 && pinCodes && city) {
            let tempCity = {}
            if (city) {
                tempCity = cityRoot.cities.find(c => c._id == city)
            }
            else {
                tempCity.name = previousData.cityName
                tempCity._id = previousData.cityId
            }
            let tempServiceCategory = serviceCategory.map(o => o._id)
            const zipcodes = pinCodes.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            const formData = new FormData();
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phoneNumber", phoneNumber)
            formData.append("remark", remark)
            formData.append("zipcodes", JSON.stringify(zipcodes))
            formData.append("serviceCategory", JSON.stringify(tempServiceCategory))
            formData.append("city", JSON.stringify({ _id: tempCity._id, name: tempCity.name }))
            if (imgUrl !== "") {
                formData.append("imgUrl", imgUrl)
            }
            //DISPATCH ACTION
            dispatch(updateServiceProvider(formData, previousData._id, () => {
                //UPDATE ALL LOCAL STATE TO ITS INITIAL STATE
                setUpdateServiceProviderModal(false)
                setName("")
                setEmail("")
                setPhoneNumber("")
                setServiceCategory([])
                setCity({})
                setRemark("")
                setImgUrl("")
                setPincodes([])
                setPreviousCity("")
            }))
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
            <Modal show={updateServiceProviderModal} onHide={() => setUpdateServiceProviderModal(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>UPDATE SERVICE PROVIDER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={formHandler}>

                        <Form.Group >
                            <Form.Label>Name *</Form.Label>
                            <Form.Control required value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                accept=".jpg,.png,.jpeg"
                                onChange={imagehandler}
                                type="file"
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Service Category *</Form.Label>
                            <Typeahead
                                id="basic-typeahead-multiple"
                                labelKey="name"
                                multiple
                                onChange={setServiceCategory}
                                options={serviceRoot.serviceCategories}
                                placeholder="Choose ServiceCategory ..."
                                selected={serviceCategory}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>City *</Form.Label>

                            <Form.Control required onChange={(e) => setCity(e.target.value)} as="select">
                                <option>Select</option>
                                {cityRoot.cities.length !== 0 ? cityRoot.cities.map(c =>
                                    <option value={c._id}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Previous : {previousCity}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Pincodes</Form.Label>
                            <Form.Control onChange={(e) => setPincodes(e.target.value)} value={pinCodes} as="textarea" rows={3} />
                            <Form.Text className="text-muted">
                                Enter Pincodes in below format
                                <br />
                                201301, 201305, 201306
                            </Form.Text>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </Form.Group>

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

export default UpdateServiceProviderModal