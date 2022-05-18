import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { getServiceCategories, getServicesByServiceCategory } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';
import { getServiceProviders } from "../../redux/actions/serviceProvider";

const AddJobManuallyModal = ({ addManualJobModal, setAddManulJobModal }) => {

    //Redux Data
    const reduxData = useSelector(store => store)
    const { serviceRoot, serviceProviderRoot } = reduxData
    const { serviceCategories, services, loader } = serviceRoot
    let serviceProviders = serviceProviderRoot.serviceProviders

    //Component States
    let [serviceP, setServiceP] = useState([])
    const [serviceProvider, setServiceProvider] = useState([]);
    const [serviceCategory, setServiceCategory] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [price, setPrice] = useState("")
    const [_services, _setServices] = useState([]);

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     if (_services.length > 0){
    //         console.log("_services",_services)

    //     }
    // },[_services])

    const formHandler = (e) => {
        e.preventDefault()
    }

    //Handle Sevices (Get Service by Service Category)
    useEffect(() => {
        if (serviceCategories.length > 0 && serviceCategory && serviceCategory !== "Select") {
            dispatch(getServicesByServiceCategory(serviceCategory))
        }
    }, [serviceCategory])

    //Get All the primary Data.
    useEffect(() => {
        dispatch(getServiceCategories())
        dispatch(getServiceProviders())
        if (serviceProviders) {
            setServiceP(serviceProviders)
        }
    }, [])

    //Manage serviceprovider by zipcode and serviceCategory
    useEffect(() => {
        if (serviceProviders.length > 0) {
            //Get the zipcode and serviceCategory from current booking.
            let bookingZipcode = zipcode
            //const bookingServiceCategory = currentBooking.services[0].serviceCategory
            //Filter all service providers who serve above service at above location.

            let _serviceProviders = []
            for (const sp of serviceProviders) {
                let serviceCategoryMatch = false
                let zipcodeMatch = false

                //Handle serviceCategory
                // if (bookingServiceCategory) {
                //     for (const sc of sp.serviceCategoryId) {
                //         if (sc._id == bookingServiceCategory) {
                //             serviceCategoryMatch = true
                //         }
                //     }
                // }

                //Handler pincode
                if (bookingZipcode && bookingZipcode.length == 6) {
                    for (const zc of sp.zipcodes) {
                        if (zc == bookingZipcode) {
                            zipcodeMatch = true
                        }
                    }
                }

                if (zipcodeMatch) {
                    _serviceProviders.push(sp)
                }

            }
            setServiceP(_serviceProviders)

            //Handle If no zipcode selected.
            if (zipcode === "") {
                setServiceP(serviceProviders)
            }
        }
    }, [serviceProviders, zipcode])

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

                        <Form.Group >
                            <Form.Label>Service</Form.Label>
                            <Typeahead
                                id="basic-typeahead-multiple"
                                labelKey="serviceName"
                                multiple
                                onChange={_setServices}
                                options={services}
                                placeholder="Choose Service ..."
                                selected={_services}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control value={zipcode} onChange={(e) => setZipcode(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Service Provider</Form.Label>

                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={setServiceProvider}
                                options={serviceP}
                                placeholder="Choose ServiceProvider ..."
                                selected={serviceProvider}
                            />

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