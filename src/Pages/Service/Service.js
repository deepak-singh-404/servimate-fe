import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import AddServiceModal from '../../Components/Service/AddServiceModal'
import { getServices, setServices } from '../../redux/actions/serviceAction'
import DeleteModal from '../../Components/DeleteModal'
import UpdateServiceModal from '../../Components/Service/UpdateServiceModal'
import Loader from '../../Components/Loader'

const Service = (props) => {
    const serviceRoot = useSelector(store => store.serviceRoot)
    const { loader, services } = serviceRoot
    const dispatch = useDispatch()
    const [addServiceModal, setAddServiceModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [previousData, setPreviousData] = useState({})

    useEffect(() => {
        dispatch(getServices(props.match.params.serviceSubCategoryId))
        return () => {
            dispatch(setServices([]))
        }
    }, [props.match.params.serviceSubCategoryId])

    const deleteHandler = (service) => {
        const temp_data = {
            _id: service._id,
            name: service.serviceName,
            actionType: "delete_service"
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    return (
        <>
            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal} />}

            {addServiceModal && <AddServiceModal
                serviceSubCategory={props.match.params.serviceSubCategoryId}
                addServiceModal={addServiceModal} setAddServiceModal={setAddServiceModal} />}

            {updateModal && <UpdateServiceModal
                updateServiceModal={updateModal}
                setUpdateServiceModal={setUpdateModal}
                serviceSubCategory={props.match.params.serviceSubCategoryId}
                previousData={previousData}
            />}

            <Container >
                <Row className="my-2">
                    <Col >
                        <h6>{props.match.params.serviceSubCategoryName}</h6>
                        <Button variant="primary" type="button" onClick={() => setAddServiceModal(true)}>ADD NEW</Button>
                    </Col>
                </Row>
                {loader ? <Loader /> : <>
                    {services.length === 0 ? <h5>No Services Found</h5> : 
                    <>
                        <Row>
                            <Col >
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="text-center">S.No ({services.length})</th>
                                            <th className="text-center">Service</th>
                                            <th className="text-center">Price</th>
                                            <th className="text-center">Icon Url</th>
                                            <th className="text-center">Image Url</th>
                                            <th className="text-center">Includes</th>
                                            <th className="text-center">Update</th>
                                            <th className="text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service, index) =>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{service.serviceName}</td>
                                                <td>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>Actual Price</td>
                                                        <td>Discounted Price</td>
                                                    </tr>
                                                    {service.price.map(d =>
                                                        <tr>
                                                            <td>{d.cityName}</td>
                                                            <td>{d.actualPrice}</td>
                                                            <td>{d.discountedPrice}</td>
                                                        </tr>
                                                    )}
                                                </td>
                                                <td className="text-center"><a href={service.iconUrl} target="_blank">{service.iconUrl && "url"} </a></td>
                                                <td className="text-center"><a href={service.imgUrl} target="_blank">{service.imgUrl && "url"} </a></td>
                                                <td className="text-center">{service.includes.join(', ')}</td>
                                                <td className="text-center"><Button onClick={() => {
                                                    setUpdateModal(true)
                                                    setPreviousData(service)
                                                }} variant="outline-info">Update</Button></td>
                                                <td className="text-center"><Button onClick={() => deleteHandler(service)} variant="outline-info">Delete</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>}
                </>}
            </Container>
        </>
    )
}


export default Service