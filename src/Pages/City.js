import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import {getCities} from '../redux/actions/cityAction'

import AddCityModal from '../Components/City/AddCityModal'
import DeleteModal from '../Components/DeleteModal'

const City = () => {
    const cityData = useSelector(store => store.cityRoot)
    const { loader, cities } = cityData
    const dispatch =  useDispatch()
    const [addCityModal, setAddCityModal] = useState(false)
    const [editCityModal, setEditCityModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const deleteHandler = (c)=>{
        const temp_data = {
          _id: c._id,
          name: c.name,
          actionType: "delete_city",
        }
        setData(temp_data)
        setDeleteModal(true)
      }


    useEffect(()=>{
        dispatch(getCities())
    },[])

    return (
        <>
         {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
           {addCityModal && <AddCityModal addCityModal={addCityModal} setAddCityModal={setAddCityModal} />}
            <Container >
                <Row className="mt-5">
                    <Col md={2}>
                        <Button variant="primary" type="button" onClick={() => setAddCityModal(true)}>ADD CITY</Button>
                    </Col>
                    <Col md={10}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No ({cities.length})</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">State</th>
                                    <th className="text-center">PinCodes</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.length !== 0 ? cities.map((city, index) =>
                                    <tr>
                                        <td className="text-center">{index +  1}</td>
                                        <td className="text-center">{city.name}</td>
                                        <td className="text-center">{city.state}</td>
                                        <td className="text-center">{city.zipcodes.join(', ')}</td>
                                        <td className="text-center"><Button variant="outline-info">UPDATE </Button> {" "} <Button onClick={()=>deleteHandler(city)} variant="outline-info">DELETE</Button></td>
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


export default City