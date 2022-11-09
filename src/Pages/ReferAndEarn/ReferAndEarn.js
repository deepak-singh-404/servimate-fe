import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import Loader from '../../Components/Loader'
import { deleteReferAndEarnConfig, getAllReferAndEarnConfig } from '../../redux/actions/commonAction'
import AddReferAndEarnModal from '../../Components/ReferAndEarn/AddReferAndEarnModal'

const ReferAndEarn = () => {
    const commonReducer = useSelector(store => store.root)
    const { loader, referAndEarnConfigs } = commonReducer
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)

    useEffect(() => {
        dispatch(getAllReferAndEarnConfig())
    }, [])

    return (
        <>
            {addModal && <AddReferAndEarnModal addModal={addModal} setAddModal={setAddModal} />}
            <Container >
                <Row className="my-2">
                    <Col>
                        <Button variant="primary" type="button" onClick={() => setAddModal(true)}>ADD REFER AND EARN CONFIG</Button>
                    </Col>
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {referAndEarnConfigs.length === 0 ? <h5>No Configs Found</h5> : <>
                            <Col >
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="text-center">S.No ({referAndEarnConfigs.length})</th>
                                            <th className="text-center">Discount Type</th>
                                            <th className="text-center">Referral Amount</th>
                                            <th className="text-center">Referral Share</th>
                                            <th className="text-center">ReferredBy Share</th>
                                            <th className="text-center">Start Date</th>
                                            <th className="text-center">End Date</th>
                                            <th className="text-center">Validity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {referAndEarnConfigs.length !== 0 ? referAndEarnConfigs.map((d, index) =>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{d.discountType}</td>
                                                <td className="text-center">{d.referralAmount}</td>
                                                <td className="text-center">{d.referralShare}</td>
                                                <td className="text-center">{d.referredByShare}</td>
                                                <td className="text-center">{d.startDate}</td>
                                                <td className="text-center">{d.endDate}</td>
                                                <td className="text-center">{d.validity}</td>
                                                <td className="text-center">
                                                    {/* <Button onClick={() => {
                                                    setPreviousData(city)
                                                    setUpdateCityModal(true)
                                                }} variant="outline-info">UPDATE </Button> {" "} */}
                                                    <Button onClick={() => dispatch(deleteReferAndEarnConfig(d._id))} variant="outline-info">DELETE</Button></td>
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

export default ReferAndEarn