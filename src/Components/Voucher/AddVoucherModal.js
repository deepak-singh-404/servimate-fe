import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { addVoucher } from '../../redux/actions/voucher'
import { getAllServiceSubCategory } from '../../redux/actions/serviceAction'
import { getCities } from '../../redux/actions/cityAction'
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment'

const AddVoucherModal = ({ addVoucherModal, setAddVoucherModal }) => {
    const { voucherRoot, serviceRoot, cityRoot } = useSelector(store => store)
    const [isVisibleToAll, setIsVisibleToAll] = useState(true)
    const [voucherType, setVoucherType] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const [discount, setDiscount] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [startDate, setStartDate] = useState("")
    const [validUpto, setValidUpto] = useState("")
    const [totalNoUses, setTotalNoUses] = useState("")
    const [limitToOneUser, setLimitToOneUser] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [serviceSubCategory, setServiceSubCategory] = useState([]);
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllServiceSubCategory())
        dispatch(getCities())
    }, [])

    const handleSetVisibleToAll = () => {
        setIsVisibleToAll(!isVisibleToAll)
    }

    const formHandler = (e) => {
        e.preventDefault()
        if (serviceSubCategory.length === 0) {
            alert("Service Sub Category field is empty, Kindly add")
            return
        }
        let applyTo = serviceSubCategory.map(o => o._id)
        const data = {
            couponCode,
            discount,
            discountType,
            voucherType,
            applyTo: applyTo,
            startDate,
            validUpto,
            totalNoUses,
            limitToOneUser,
            minPrice,
            city,
            isVisibleToAll: isVisibleToAll,
            description,
            title
        }
        dispatch(addVoucher(data, () => {
            setAddVoucherModal(false)
        }))
    }

    return (
        <>
            <Modal show={addVoucherModal} onHide={() => setAddVoucherModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>VOUCHER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Voucher Type</Form.Label>
                            <Form.Control required onChange={(e) => setVoucherType(e.target.value)} as="select">
                                <option>Select</option>
                                <option value={0}>First Time User</option>
                                <option value={1}>Sale</option>
                                <option value={2}>Referal</option>
                                <option value={4}>Promotional Code</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>City </Form.Label>
                            <Form.Control onChange={(e) => setCity(e.target.value)} as="select">
                                <option>Select</option>
                                {cityRoot.cities.length !== 0 ? cityRoot.cities.map(c =>
                                    <option value={c._id}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Coupon Code</Form.Label>
                            <Form.Control required value={couponCode} onChange={(e) => setCouponCode(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Discount Type</Form.Label>
                            <Form.Control required onChange={(e) => setDiscountType(e.target.value)} as="select">
                                <option>Select</option>
                                <option value={0}>Rupee</option>
                                <option value={1}>Percentage</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Discount</Form.Label>
                            <Form.Control min="0" required value={discount} onChange={(e) => setDiscount(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Apply To</Form.Label>
                            <Typeahead
                                id="basic-typeahead-multiple"
                                labelKey="name"
                                multiple
                                onChange={setServiceSubCategory}
                                options={serviceRoot.allServiceSubCategory}
                                placeholder="Choose ServiceSubCategory ..."
                                selected={serviceSubCategory}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control min={moment().format("YYYY-MM-DD")} required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Valip  Upto</Form.Label>
                            <Form.Control min={moment().format("YYYY-MM-DD")} required type="date" value={validUpto} onChange={(e) => setValidUpto(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total No Uses For This Coupon</Form.Label>
                            <Form.Control required value={totalNoUses} onChange={(e) => setTotalNoUses(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Limit To One Use Per Customer</Form.Label>
                            <Form.Control value={limitToOneUser} onChange={(e) => setLimitToOneUser(e.target.value)} type="text" />
                        </Form.Group>

                        <Form>
                            <Form.Check
                                type="checkbox"
                                label="Visible To All"
                                checked={isVisibleToAll}
                                onChange={handleSetVisibleToAll}
                            />
                        </Form>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Min Price</Form.Label>
                            <Form.Control value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="text" />
                        </Form.Group>
                        {voucherRoot.loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddVoucherModal