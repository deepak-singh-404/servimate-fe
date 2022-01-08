import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { addServiceProvider } from '../../redux/actions/serviceProvider'
import { getCities } from '../../redux/actions/cityAction'
import { getServiceCategories } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';

const AddServiceProviderModal = ({ addServiceProviderModal, setAddServiceProviderModal }) => {
    const reduxData = useSelector(store => store)
    const { cityRoot, serviceRoot, serviceProviderRoot } = reduxData
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [wallet, setWallet] = useState("")
    const [password, setPassword] = useState("")
    const [serviceCategory, setServiceCategory] = useState([])
    const [city, setCity] = useState("")
    const [remark, setRemark] = useState("")
    const [imgUrl, setImgUrl] = useState("");
    const [pinCodes, setPincodes] = useState("")

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImgUrl(img);
        }
    };

    const formHandler = (e) => {
        e.preventDefault()

        //MAKE SURE REQUIRED FIEDS ARE NOT EMPTY
        if (name && phoneNumber && password && serviceCategory.length > 0 && city && pinCodes && wallet) {
            const tempCity = cityRoot.cities.find(c => c._id == city)
            let tempServiceCategory = serviceCategory.map(o => o._id)
            const zipcodes = pinCodes.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            const formData = new FormData();
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("phoneNumber", phoneNumber)
            formData.append("wallet", Number(wallet))
            formData.append("remark", remark)
            formData.append("zipcodes", JSON.stringify(zipcodes))
            formData.append("serviceCategory", JSON.stringify(tempServiceCategory))
            formData.append("city", JSON.stringify({ _id: tempCity._id, name: tempCity.name }))
            if (imgUrl !== "") {
                formData.append("imgUrl", imgUrl)
            }

            //DISPATCH ACTION
            dispatch(addServiceProvider(formData, () => {

                //UPDATE ALL LOCAL STATE TO ITS INITIAL STATE
                setAddServiceProviderModal(false)
                setName("")
                setEmail("")
                setPhoneNumber("")
                setPassword("")
                setServiceCategory([])
                setCity({})
                setRemark("")
                setImgUrl("")
                setPincodes([])
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
                            <Form.Control required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Wallet Money *</Form.Label>
                            <Form.Control required value={wallet} onChange={(e) => setWallet(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password *</Form.Label>
                            <Form.Control required value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
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