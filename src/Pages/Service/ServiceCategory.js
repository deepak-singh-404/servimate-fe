import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { getServiceCategories } from "../../redux/actions/serviceAction";
import ServiceCategoryModal from "../../Components/ServiceCategory/AddServiceCategoryModal";
import DeleteModal from '../../Components/DeleteModal'
import { getCities } from "../../redux/actions/cityAction";

const ServiceCategory = () => {
  const serviceRoot = useSelector((store) => store.serviceRoot);
  const { loader, serviceCategories } = serviceRoot;
  const dispatch = useDispatch();
  const [addServiceCategoryModal, setAddServiceCategoryModal] = useState(false);
  const [data, setData] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(()=>{
    dispatch(getServiceCategories())
  },[])

  const deleteHandler = (serviceCategory)=>{
    const temp_data = {
      _id: serviceCategory._id,
      name: serviceCategory.name,
      actionType: "delete_service_category"
    }
    setData(temp_data)
    setDeleteModal(true)
  }

  return (
    <>
      {addServiceCategoryModal && <ServiceCategoryModal
        addServiceCategoryModal={addServiceCategoryModal}
        setAddServiceCategoryModal={setAddServiceCategoryModal}
      
      />}
      {deleteModal && <DeleteModal
        data = {data}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />}
      <Container>
        <Row className="mt-5">
          <Col md={2} >
            <Button onClick={() => setAddServiceCategoryModal(true)}>
              ADD SERVICE-CATEGORY
            </Button>
          </Col>
          <Col md={10} >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No</th>
                                    <th className="text-center">Service-Category</th>
                                    <th className="text-center">M.C.P</th>
                                    <th className="text-center">Icon Url</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Update</th>
                                    <th className="text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceCategories.length !== 0 ? serviceCategories.map((serviceCategory, index) =>
                                    <tr>
                                        <td className="text-center">{index +  1}</td>
                                        <td className="text-center"><Link to={`/serviceCategory/${serviceCategory.name}/${serviceCategory._id}`}>{serviceCategory.name}</Link></td>
                                        <td className="text-center">{serviceCategory.minAmountForCheckout}</td>
                                        <td className="text-center"><a href={serviceCategory.iconUrl} target="_blank">{serviceCategory.iconUrl && "url"} </a></td>
                                        <td className="text-center">{serviceCategory.cities.map(e => e.name).join(", ")}</td>
                                        <td className="text-center"><Button variant="outline-info">Update </Button></td>
                                        <td className="text-center"><Button onClick={()=>deleteHandler(serviceCategory)} variant="outline-info">Delete</Button></td>
                                    </tr>
                                ): null}
                            </tbody>
                        </Table>
                    </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceCategory;
