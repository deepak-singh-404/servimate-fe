import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { getServiceCategories, getServicesByServiceCategory } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';
import { getCities } from '../../redux/actions/cityAction'
import moment from 'moment'
import { adminAddJobManually } from '../../redux/actions/booking'

const Slots = [
    '09:00 AM  -  09:30 AM',
    '09:30 AM  -  10:30 AM',
    '10:30 AM  -  11:30 AM',
    '11:30 AM  -  12:00 PM',
    '12:00 PM  -  12:30 PM',
    '12:30 PM  -  01:00 PM',
    '01:00 PM  -  01:30 PM',
    '01:30 PM  -  02:00 PM',
    '02:00 PM  -  02:30 PM',
    '02:30 PM  -  03:00 PM',
    '03:00 PM  -  03:30 PM',
    '03:30 PM  -  04:00 PM',
    '04:00 PM  -  04:30 PM',
    '04:30 PM  -  05:00 PM',
    '05:00 PM  -  05:30 PM',
    '05:30 PM  -  06:00 PM',
    '06:00 PM  -  06:30 PM',
    '06:30 PM  -  07:00 PM'
]

const AddJobManuallyModal = ({ addManualJobModal, setAddManulJobModal }) => {

    //Redux Data
    const reduxData = useSelector(store => store)
    const { serviceRoot, cityRoot } = reduxData
    const { serviceCategories, services, loader } = serviceRoot

    //Component States
    const [serviceCategory, setServiceCategory] = useState("")
    let [_services, _setServices] = useState([]);
    const [city, setCity] = useState("")
    const [cityName, setCityName] = useState("")
    const [price, setPrice] = useState("")
    const [extracharge, setExtracharge] = useState("0")
    const [pincode, setPincode] = useState("")
    const [address, setAddress] = useState("")
    const [serviceDate, setServiceDate] = useState("")
    const [slot, setSlot] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("")


    const dispatch = useDispatch()

    //Handle Sevices (Get Service by Service Category)
    useEffect(() => {
        if (serviceCategories.length > 0 && serviceCategory && serviceCategory !== "Select") {
            dispatch(getServicesByServiceCategory(serviceCategory))
        }
    }, [serviceCategory])

    //Get All the primary Data.
    useEffect(() => {
        dispatch(getServiceCategories())
        dispatch(getCities())
    }, [])


    //Handle Price
    useEffect(() => {
        if (_services.length > 0) {
            let price = 0
            for (const s of _services) {
                const p = s.price.find((d) => d["city"] === city)
                setCityName(p["cityName"])
                if (p) {
                    price = price + p["discountedPrice"]
                }
            }
            setPrice(price)
        }
    }, [_services, city])

    const formHandler = (e) => {
        e.preventDefault()
        //Validation
        if (_services.length == 0) {
            alert("Please select atleast one service.")
            return;
        }

        if (!price || Number(price) == 0) {
            alert("Invalid price.")
            return;
        }

        if (!serviceDate) {
            alert("Please select service date.")
            return;
        }
        if (!pincode || pincode.length !== 6) {
            alert("Invalid pincode.")
            return;
        }
        if (!address || address.length < 5) {
            alert("Invalid address.")
            return;
        }

        if (!slot || slot == "Select") {
            alert("Invalid Slot.");
            return;
        }
        if (!customerName || customerName.length < 3) {
            alert("Invalid customer name.")
            return;
        }
        if (!customerPhoneNumber || !customerPhoneNumber.length == 10) {
            alert("Invalid PhoneNo.")
            return;
        }
        _services = _services.map((d) => {
            let p = {}
            p["serviceName"] = d["serviceName"]
            p["serviceCategory"] = d["serviceCategory"]
            p["serviceId"] = d["_id"]
            p["quantity"] = 1
            return p
        })

        let data = {
            services: _services,
            address: {
                name: customerName,
                phoneNumber: String(customerPhoneNumber).startsWith("+91") ? String(customerPhoneNumber) : "+91" + String(customerPhoneNumber),
                address: address,
                zipcode: Number(pincode),
                city: cityName
            },
            serviceDate,
            extraCharge: {
                type: "hygenic",
                amount: Number(extracharge)
            },
            cartAmount: Number(price),
            finalAmount: Number(price) + Number(extracharge),
            customer: {
                name: customerName,
                phoneNumber: String(customerPhoneNumber).startsWith("+91") ? String(customerPhoneNumber) : "+91" + String(customerPhoneNumber)
            },
            city: {
                _id: city,
                name: cityName
            },
            timeSlot: slot
        }
        dispatch(adminAddJobManually(data, () => {
            setAddManulJobModal(false)
           
        }))
    }
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
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Extra Charge</Form.Label>
                            <Form.Control value={extracharge} onChange={(e) => setExtracharge(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Service Date</Form.Label>
                            <Form.Control min={moment().format("YYYY-MM-DD")} required type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Time Slot</Form.Label>
                            <Form.Control onChange={(e) => setSlot(e.target.value)} as="select">
                                <option>Select </option>
                                {Slots.map(data =>
                                    <option value={data} >{data}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control value={customerName} onChange={(e) => setCustomerName(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Customer PhoneNo.</Form.Label>
                            <Form.Control value={customerPhoneNumber} onChange={(e) => setCustomerPhoneNumber(e.target.value)} type="text" />
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

export default AddJobManuallyModal