import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { addImageToTheServiceSubCategory, getServiceSubCategories, setServiceSubCategories } from "../../redux/actions/serviceAction";
import ServiceSubCategoryModal from "../../Components/ServiceSubCategory/AddServiceSubCategoryModal";
import UpdateServiceSubCategoryModal from "../../Components/ServiceSubCategory/UpdateServiceSubCategoryModal"
import DeleteModal from '../../Components/DeleteModal'
import Loader from "../../Components/Loader";

const ServiceSubCategory = (props) => {
  const { loader, serviceSubCategories } = useSelector((store) => store.serviceRoot);
  const dispatch = useDispatch();
  const [addServiceSubCategoryModal, setAddServiceSubCategoryModal] = useState(false)
  const [updateServiceSubCategoryModal, setUpdateServiceSubCategoryModal] = useState(false)
  const [data, setData] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [previousData, setPreviousData] = useState({});
  const [picture, setPicture] = useState("");

  useEffect(() => {
    dispatch(getServiceSubCategories(props.match.params.serviceCategoryId))
    localStorage.setItem("service-category", props.match.params.serviceCategoryId)
    return () => {
      dispatch(setServiceSubCategories([]))
    }
  }, [props.match.params.serviceCategoryId])

  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setPicture(img);
    }
  };


  const upload = (type, serviceSubCategoryId) => {
    if ((type == "picture") && (picture == "")) {
      alert("Please select banner.")
      return
    }
    let params = `serviceSubCategoryId=${serviceSubCategoryId}`

    if ((type == "picture") && picture) {
      const formData = new FormData();
      formData.append("picture", picture)
      dispatch(addImageToTheServiceSubCategory(params, formData, () => {
        window.location.reload();
      }))
    }

  }

  const imageDeleteHandler = (_data) => {
    const temp_data = {
      actionType: "delete_image",
      data: _data
    }
    setData(temp_data)
    setDeleteModal(true)
  }

  const deleteHandler = (serviceSubCategory) => {
    const temp_data = {
      _id: serviceSubCategory._id,
      name: serviceSubCategory.name,
      actionType: "delete_service_sub_category"
    }
    setData(temp_data)
    setDeleteModal(true)
  }

  return (
    <>
      {deleteModal && <DeleteModal
        data={data}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />}
      {addServiceSubCategoryModal && <ServiceSubCategoryModal
        addServiceSubCategoryModal={addServiceSubCategoryModal}
        setAddServiceSubCategoryModal={setAddServiceSubCategoryModal}
        serviceCategory={props.match.params.serviceCategoryId}
      />}
      {updateServiceSubCategoryModal && <UpdateServiceSubCategoryModal
        updateServiceSubCategoryModal={updateServiceSubCategoryModal}
        setUpdateServiceSubCategoryModal={setUpdateServiceSubCategoryModal}
        serviceCategory={props.match.params.serviceCategoryId}
        previousData={previousData}
      />}
      <Container>
        <Row className="my-2">
          <Col >
            <h5>{props.match.params.serviceCategoryName}</h5>
            <Button onClick={() => setAddServiceSubCategoryModal(true)}>
              ADD NEW
            </Button>
          </Col>
        </Row>
        {loader ? <Loader /> : <>
          {serviceSubCategories.length === 0 ? <h5>No ServiceSubCategories Found</h5> : <>

            <Row>
              <Col className="mt-2">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({serviceSubCategories.length})</th>
                      <th className="text-center">Index</th>
                      <th className="text-center">Service-Sub-Category</th>
                      <th className="text-center">IconUrl</th>
                      <th className="text-center">Update</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceSubCategories.map((serviceSubCategory, index) =>
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{serviceSubCategory.index}</td>
                        <td className="text-center"><Link to={`/serviceSubCategory/${serviceSubCategory.name}/${serviceSubCategory._id}`}>{serviceSubCategory.name}</Link></td>
                        <td className="text-center"><a href={serviceSubCategory.iconUrl} target="_blank">{serviceSubCategory.iconUrl && "url"} </a></td>
                        <td>
                          {serviceSubCategory.picture ?
                            <>
                              <img width="100%" height="10%" src={serviceSubCategory.picture} />
                              <Button variant="outline-danger" onClick={() => imageDeleteHandler({
                                "url": serviceSubCategory.picture,
                                "entityId": serviceSubCategory._id,
                                "module": "SERVICE_SUB_CATEGORY",
                                "fieldType": "PARENT_KEY",
                                "fieldName": "picture"
                              })}>
                                Delete
                              </Button>
                            </>
                            :
                            <>
                              <Form.Control
                                accept=".jpg,.png,.jpeg"
                                onChange={imagehandler}
                                type="file"
                              />
                              <Button onClick={() => upload("picture", serviceSubCategory._id)} variant="outline-danger">Upload</Button>
                            </>
                          }
                        </td>
                        <td className="text-center"><Button onClick={
                          () => {
                            setUpdateServiceSubCategoryModal(true)
                            setPreviousData(serviceSubCategory)
                          }} variant="outline-info">Update </Button></td>
                        <td className="text-center"><Button onClick={() => deleteHandler(serviceSubCategory)} variant="outline-info">Delete</Button></td>
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
  );
};

export default ServiceSubCategory;
