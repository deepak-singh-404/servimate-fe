import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button, Form } from 'react-bootstrap'
import AddServiceProviderModal from '../../Components/ServiceProvider/AddServiceProviderModal'
import { getServiceProviders, updatePartnerWallet, updateServiceProvider } from '../../redux/actions/serviceProvider'
import DeleteModal from '../../Components/DeleteModal'
import Loader from '../../Components/Loader'
import UpdateWalletModal from '../../Components/ServiceProvider/UpdateWalletModal'
import UpdateServiceProviderModal from '../../Components/ServiceProvider/UpdateServiceproviderModal'
import { getServiceCategories } from '../../redux/actions/serviceAction'
import { Typeahead } from 'react-bootstrap-typeahead';


const ServiceProvider = () => {
    const reduxData = useSelector(store => store)
    const { serviceRoot, serviceProviderRoot } = reduxData
    const { loader, serviceProviders } = serviceProviderRoot
    const dispatch = useDispatch()
    const [addServiceProviderModal, setAddServiceProviderModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateWalletModal, setUpdateWalletModal] = useState(false)
    const [partnerId, setPartnerId] = useState("")
    const [updateServiceProviderModal, setUpdateServiceProviderModal] = useState(false)
    const [previousData, setPreviousData] = useState({})
    const [partners, setPartners] = useState([])
    const [fpincode, setfpincode] = useState("")
    const [serviceCategory, setServiceCategory] = useState([])

    useEffect(() => {
        if (serviceProviders.length > 0) {
            setPartners(serviceProviders)
        }
    }, [serviceProviders])

    //Handler Zipcode Filter
    useEffect(() => {
        let _partners = []
        if (serviceProviders.length > 0 && fpincode.length == 6) {
            for (const p of partners) {
                const isExist = p.zipcodes.find(d => d == Number(fpincode))
                if (isExist) {
                    _partners.push(p)
                }
            }
            setPartners(_partners)
        }
    }, [fpincode])

    useEffect(() => {
        let _partners = []
        if (serviceProviders.length > 0 && serviceCategory.length > 0) {
            for (const p of partners) {
                const isExist = p.serviceCategoryId.find(d => d._id == serviceCategory[0]._id)
                if (isExist) {
                    _partners.push(p)
                }
            }
            setPartners(_partners)
        }
    }, [serviceCategory])

    const deleteHandler = (s) => {
        const temp_data = {
            _id: s._id,
            name: s.name,
            actionType: "delete_service_provider",
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    useEffect(() => {
        dispatch(getServiceProviders())
        dispatch(getServiceCategories())
    }, [])

    const refreshHandler = () => {
        setfpincode("")
        setServiceCategory([])
        setPartners(serviceProviders)
    }
    return (
        <>
            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal} />
            }
            {
                updateWalletModal && <UpdateWalletModal
                    partnerId={partnerId}
                    updateWalletModal={updatePartnerWallet}
                    setUpdateWalletModal={setUpdateWalletModal} />
            }
            {
                updateServiceProviderModal && <UpdateServiceProviderModal
                    previousData={previousData}
                    updateServiceProviderModal={updateServiceProviderModal}
                    setUpdateServiceProviderModal={setUpdateServiceProviderModal} />
            }

            {addServiceProviderModal && <AddServiceProviderModal addServiceProviderModal={addServiceProviderModal} setAddServiceProviderModal={setAddServiceProviderModal} />}
            <Container fluid>
                <Row>
                    <Col md={2} className="my-auto" >
                        <Button variant="primary" type="button" onClick={() => setAddServiceProviderModal(true)}>ADD SERVICE PROVIDER</Button>
                        {loader ? <Loader /> : null}
                    </Col>
                    <Col md={2} className="my-auto" >
                        <Form>
                            <Form.Group>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    value={fpincode}
                                    placeholder="Pincode"
                                    onChange={(e) => setfpincode(e.target.value)}
                                    type="text"
                                />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md={2}>
                        <Form.Group >
                            <Form.Label>Service Category</Form.Label>
                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                single
                                onChange={setServiceCategory}
                                options={serviceRoot.serviceCategories}
                                placeholder="Choose ServiceCategory ..."
                                selected={serviceCategory}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="my-auto">
                        <Button onClick={refreshHandler} >Refresh</Button>
                    </Col>
                </Row>

                {partners.length > 0 && <Row >
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No ({partners.length})</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Phone Number</th>
                                    <th className="text-center">Wallet Money</th>
                                    <th className="text-center">Initial Password</th>
                                    <th className="text-center">Profile Picture</th>
                                    <th className="text-center">Service Category</th>
                                    <th className="text-center">City</th>
                                    {/* <th className="text-center">Zipcodes</th> */}
                                    <th className="text-center">Remark</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Hold/Unhold</th>
                                    <th className="text-center">Wallet</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners.map((s, index) =>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{s.name}</td>
                                        <td className="text-center">{s.phoneNumber}</td>
                                        <td className="text-center">{s.wallet ? s.wallet : null}</td>
                                        <td className="text-center">{s.initialPassword}</td>
                                        <td className="text-center"><a href={s.imgUrl} target="_blank">{s.imgUrl && "url"} </a></td>
                                        <td className="text-center">{s.serviceCategoryId.length > 0 && s.serviceCategoryId.map(s => s.name).join(", ")}</td>
                                        <td className="text-center">{s.cityName}</td>
                                        {/* <td className="text-center">{s.zipcodes && s.zipcodes.join(', ')}</td> */}
                                        <td className="text-center">{s.remark}</td>
                                        <td className="text-center">{s.email}</td>
                                        <td className="text-center">{s.isAccountOnHold ?
                                            <Button variant="outline-info" onClick={() => {
                                                dispatch(updateServiceProvider({ isAccountOnHold: false }, s._id, () => {
                                                }))
                                            }}>UNHOLD</Button> :
                                            <Button variant="outline-info" onClick={() => {
                                                dispatch(updateServiceProvider({ isAccountOnHold: true }, s._id, () => {
                                                }))
                                            }}>HOLD</Button>}</td>
                                        <td className="text-center"><Button variant="outline-info" onClick={() => {
                                            setPartnerId(s._id)
                                            setUpdateWalletModal(true)
                                        }}>Add Amount</Button></td>
                                        <td className="text-center">
                                            <Button variant="outline-info" onClick={() => {
                                                setPreviousData(s)
                                                setUpdateServiceProviderModal(true)
                                            }}>UPDATE </Button> {" "}
                                            <Button
                                                onClick={() => deleteHandler(s)} variant="outline-info">DELETE</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>}
            </Container>
        </>
    )
}


export default ServiceProvider