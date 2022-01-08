import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import Loader from '../Loader'
import { updateVoucher } from '../../redux/actions/voucher'
import { getAllServiceSubCategory } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment'

const UpdateVoucherModal = ({ updateVoucherModal, setUpdateVoucherModal, previousData }) => {
    const { voucherRoot, serviceRoot } = useSelector(store => store)
    const dispatch = useDispatch()
    const [tempVoucherType, setTempVoucherType] = useState(previousData.voucherType.toString() ? () => {
        const d = previousData.voucherType
        if (d == 0) return "First Time User"
        if (d == 1) return "Sale"
        if (d == 2) return "Referal"
        if (d == 4) return "Promotional Code"
    } : "")
    const [voucherType, setVoucherType] = useState("")
    const [couponCode, setCouponCode] = useState(previousData.couponCode ? previousData.couponCode : "")
    const [discount, setDiscount] = useState(previousData.discount ? previousData.discount : "")
    const [tempDiscountType, setTempDiscountType] = useState(previousData.discountType.toString() ? () => {
        const d = previousData.discountType
        if (d == 0) return "Rupee"
        if (d == 1) return "Percentage"
    } : "")
    const [discountType, setDiscountType] = useState("")
    const [startDate, setStartDate] = useState(previousData.startDate ? previousData.startDate : "")
    const [validUpto, setValidUpto] = useState(previousData.validUpto ? previousData.validUpto : "")
    const [totalNoUses, setTotalNoUses] = useState(previousData.totalNoUses ? previousData.totalNoUses : "")
    const [limitToOneUser, setLimitToOneUser] = useState(previousData.limitToOneUser ? previousData.limitToOneUser : "")
    const [minPrice, setMinPrice] = useState(previousData.minPrice ? previousData.minPrice : "")
    const [serviceSubCategory, setServiceSubCategory] = useState(previousData.applyTo ? previousData.applyTo : []);

    useEffect(() => {
        dispatch(getAllServiceSubCategory())
    }, [])

    const formHandler = (e) => {
        e.preventDefault()
        if (!discountType.toString() || !voucherType.toString()) {
            alert("Please select discountType and voucherType")
            return
        }
        if (serviceSubCategory.length !== 0 && couponCode && discount && startDate && validUpto) {
            let applyTo = serviceSubCategory.map(o => o._id)
            const data = {
                couponCode,
                discount,
                discountType: Number(discountType),
                voucherType: Number(voucherType),
                applyTo: applyTo,
                startDate,
                validUpto,
                totalNoUses,
                limitToOneUser,
                minPrice
            }
            dispatch(updateVoucher(previousData._id, data, () => {
                setUpdateVoucherModal(false)
            }))
        }
        else {
            alert("Fields Are Empty")
            return
        }

    }

    return (
        <>
            <Modal show={updateVoucherModal} onHide={() => setUpdateVoucherModal(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>UPDATE VOUCHER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Voucher Type</Form.Label>
                            <Form.Control required onChange={(e) => setVoucherType(e.target.value)} as="select">
                                <option value="not_selected"> Select</option>
                                <option value={0}>First Time User</option>
                                <option value={1}>Sale</option>
                                <option value={2}>Referal</option>
                                <option value={4}>Promotional Code</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Previous: {tempVoucherType}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Coupon Code</Form.Label>
                            <Form.Control required value={couponCode} onChange={(e) => setCouponCode(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Discount Type</Form.Label>
                            <Form.Control required onChange={(e) => setDiscountType(e.target.value)} as="select">
                                <option value="not_selected"> Select</option>
                                <option value={0}>Rupee</option>
                                <option value={1}>Percentage</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Previous: {tempDiscountType}
                            </Form.Text>
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

export default UpdateVoucherModal