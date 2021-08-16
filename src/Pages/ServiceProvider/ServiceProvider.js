import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import AddServiceProviderModal from '../../Components/ServiceProvider/AddServiceProviderModal'
import { getServiceProviders } from '../../redux/actions/serviceProvider'
import DeleteModal from '../../Components/DeleteModal'



const ServiceProvider = () => {
    const serviceProviderRoot = useSelector(store => store.serviceProviderRoot)
    const { loader, serviceProviders } = serviceProviderRoot
    const dispatch =  useDispatch()
    const [addServiceProviderModal, setAddServiceProviderModal] = useState(false)
    // const [editCityModal, setEditCityModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const deleteHandler = (s)=>{
        const temp_data = {
          _id: s._id,
          name: s.name,
          actionType: "delete_service_provider",
        }
        setData(temp_data)
        setDeleteModal(true)
      }

    useEffect(()=>{
        dispatch(getServiceProviders())
    },[])

    return (
        <>
         {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
           {addServiceProviderModal && <AddServiceProviderModal addServiceProviderModal={addServiceProviderModal} setAddServiceProviderModal={setAddServiceProviderModal} />}
            <Container >
                <Row className="mt-5">
                    <Col md={2} >
                        <Button variant="primary" type="button" onClick={() => setAddServiceProviderModal(true)}>ADD SERVICE PROVIDER</Button>
                    </Col>
                    <Col md={10} >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No ({serviceProviders.length})</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Phone Number</th>
                                    <th className="text-center">Profile Picture</th>
                                    <th className="text-center">Service Category</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Remark</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceProviders.length !== 0 ? serviceProviders.map((s, index) =>
                                    <tr>
                                        <td className="text-center">{index +  1}</td>
                                        <td className="text-center">{s.name}</td>
                                        <td className="text-center">{s.phoneNumber}</td>
                                        <td className="text-center"><a href={s.imgUrl} target="_blank">{s.imgUrl && "url"} </a></td>
                                        <td className="text-center">{s.serviceCategoryName}</td>
                                        {/* <td className="text-center">{s.verifed ? "Verified" : "Not Verified"}</td> */}
                                        <td className="text-center">{s.cityName}</td>
                                        <td className="text-center">{s.remark}</td>
                                        <td className="text-center">{s.email}</td>
                                        <td className="text-center"><Button variant="outline-info">UPDATE </Button> {" "} <Button onClick={()=>deleteHandler(s)} variant="outline-info">DELETE</Button></td>
                                    </tr>
                                ): null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default ServiceProvider