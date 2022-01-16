import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import AddServiceProviderModal from '../../Components/ServiceProvider/AddServiceProviderModal'
import { getServiceProviders, updatePartnerWallet, updateServiceProvider } from '../../redux/actions/serviceProvider'
import DeleteModal from '../../Components/DeleteModal'
import Loader from '../../Components/Loader'
import UpdateWalletModal from '../../Components/ServiceProvider/UpdateWalletModal'
import UpdateServiceProviderModal from '../../Components/ServiceProvider/UpdateServiceproviderModal'


const ServiceProvider = () => {
    const serviceProviderRoot = useSelector(store => store.serviceProviderRoot)
    const { loader, serviceProviders } = serviceProviderRoot
    const dispatch = useDispatch()
    const [addServiceProviderModal, setAddServiceProviderModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateWalletModal, setUpdateWalletModal] = useState(false)
    const [partnerId, setPartnerId] = useState("")
    const [updateServiceProviderModal, setUpdateServiceProviderModal] = useState(false)
    const [previousData, setPreviousData] = useState({})

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
    }, [])

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
                <Row className="my-2">
                    <Col >
                        <Button variant="primary" type="button" onClick={() => setAddServiceProviderModal(true)}>ADD SERVICE PROVIDER</Button>
                        {loader ? <Loader /> : null}
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No ({serviceProviders.length})</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Phone Number</th>
                                    <th className="text-center">Wallet Money</th>
                                    <th className="text-center">Initial Password</th>
                                    <th className="text-center">Profile Picture</th>
                                    <th className="text-center">Service Category</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Zipcodes</th>
                                    <th className="text-center">Remark</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Hold/Unhold</th>
                                    <th className="text-center">Wallet</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceProviders.map((s, index) =>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{s.name}</td>
                                        <td className="text-center">{s.phoneNumber}</td>
                                        <td className="text-center">{s.wallet ? s.wallet : null}</td>
                                        <td className="text-center">{s.initialPassword}</td>
                                        <td className="text-center"><a href={s.imgUrl} target="_blank">{s.imgUrl && "url"} </a></td>
                                        <td className="text-center">{s.serviceCategoryId.length > 0 && s.serviceCategoryId.map(s => s.name).join(", ")}</td>
                                        <td className="text-center">{s.cityName}</td>
                                        <td className="text-center">{s.zipcodes && s.zipcodes.join(', ')}</td>
                                        <td className="text-center">{s.remark}</td>
                                        <td className="text-center">{s.email}</td>
                                        <td className="text-center">{s.isAccountOnHold ?
                                            <Button variant="outline-info" onClick={() => {
                                                dispatch(updateServiceProvider({ isAccountOnHold: false },s._id,()=>{
                                                    console.log("Success")
                                                }))
                                            }}>UNHOLD</Button> :
                                            <Button variant="outline-info" onClick={() => {
                                                dispatch(updateServiceProvider({ isAccountOnHold: true }, s._id, ()=>{
                                                    console.log("Success")
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
                </Row>
            </Container>
        </>
    )
}


export default ServiceProvider