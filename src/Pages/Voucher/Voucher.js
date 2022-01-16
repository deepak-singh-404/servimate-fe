import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import AddVoucherModal from '../../Components/Voucher/AddVoucherModal'
import { getVouchers, redeemVoucher } from '../../redux/actions/voucher'
import DeleteModal from '../../Components/DeleteModal'
import UpdateVoucherModal from '../../Components/Voucher/UpdateVoucherModal'
import Loader from '../../Components/Loader'


const Voucher = () => {
    const voucherRoot = useSelector(store => store.voucherRoot)
    const { loader, vouchers } = voucherRoot
    const dispatch = useDispatch()
    const [addVoucherModal, setAddVoucherModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateVoucherModal, setUpdateVoucherModal] = useState(false)
    const [previousData, setPreviousData] = useState({})
    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(() => {
        dispatch(getVouchers())
    }, [])

    const deleteHandler = (v) => {
        const temp_data = {
            _id: v._id,
            name: v.couponCode,
            actionType: "delete_voucher",
            metaData: {
                isActive: v.isActive
            }
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    const voucherTypeHelper = (e) => {
        if (e == 0) {
            return "First Time User"
        }
        if (e == 1) {
            return "Sale"
        }
        if (e == 2) {
            return "Referal"
        }
        if (e == 4) {
            return "Promotional Code"
        }
    }
    const discountTypeHelper = (e) => {
        if (e == 0) {
            return "Rupee"
        }
        if (e == 1) {
            return "Percentage"
        }
    }

    return (
        <>
            {updateVoucherModal && <UpdateVoucherModal updateVoucherModal={updateVoucherModal}
                setUpdateVoucherModal={setUpdateVoucherModal} previousData={previousData} />}
            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            {addVoucherModal && <AddVoucherModal addVoucherModal={addVoucherModal} setAddVoucherModal={setAddVoucherModal} />}
            <Container fluid>
                <Row className="mt-5">
                    <Col md={2}>
                        <Button variant="primary" type="button" onClick={() => setAddVoucherModal(true)}>CREATE VOUCHER</Button>
                    </Col>
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {vouchers.length === 0 ? <h5>No Vouchers Found</h5> : <>
                            <Col md={12} className="mt-5">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr >
                                            <th className="text-center">S.No ({vouchers.length})</th>
                                            <th className="text-center">Coupon Code</th>
                                            <th className="text-center">Min Price</th>
                                            <th className="text-center">Voucher Type</th>
                                            <th className="text-center">Discount Type</th>
                                            <th className="text-center">Discount</th>
                                            <th className="text-center">Current Usage</th>
                                            <th className="text-center">Total No. Of Uses</th>
                                            <th className="text-center">Limit To One User</th>
                                            <th className="text-center">Applied On</th>
                                            <th className="text-center">Active</th>
                                            <th className="text-center">Start Date (YYYY-MM-DD)</th>
                                            <th className="text-center">Valid Upto (YYYY-MM-DD)</th>
                                            <th className="text-center">Redeem</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vouchers.length !== 0 ? vouchers.map((v, index) =>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{v.couponCode}</td>
                                                <td className="text-center">{v.minPrice}</td>
                                                <td className="text-center">{voucherTypeHelper(v.voucherType)}</td>
                                                <td className="text-center">{discountTypeHelper(v.discountType)}</td>
                                                <td className="text-center">{v.discount}</td>
                                                <td className="text-center">{v.currentUsage}</td>
                                                <td className="text-center">{v.totalNoUses}</td>
                                                <td className="text-center">{v.limitToOneUser}</td>
                                                <td className="text-center">{v.applyTo.map(v => v.name).join(", ")}</td>
                                                <td className="text-center">{v.isActive ? "Active" : "Not Active"}</td>
                                                <td className="text-center">{v.startDate}</td>
                                                <td className="text-center">{v.validUpto}</td>
                                                <td className="text-center"><Button disabled={buttonDisable || v.isRedeemed} onClick={() => {
                                                    dispatch(redeemVoucher(v._id, () => {
                                                        setButtonDisable(false)
                                                    }))
                                                    setButtonDisable(true)
                                                }}>Redeem</Button></td>
                                                <td className="text-center"><Button onClick={() => {
                                                    setPreviousData(v)
                                                    setUpdateVoucherModal(true)
                                                }} variant="outline-info">UPDATE </Button> {" "} <Button onClick={() => deleteHandler(v)} variant="outline-info">DELETE</Button></td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </Table>
                            </Col>
                        </>}
                    </>}
                </Row>
            </Container>
        </>
    )
}


export default Voucher