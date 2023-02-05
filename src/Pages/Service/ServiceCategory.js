import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { addImageToTheServiceCategory, getServiceCategories, setServiceSubCategories } from "../../redux/actions/serviceAction";
import ServiceCategoryModal from "../../Components/ServiceCategory/AddServiceCategoryModal";
import UpdateServiceCategoryModal from '../../Components/ServiceCategory/UpdateServiceCategoryModal'
import DeleteModal from '../../Components/DeleteModal'
import Loader from "../../Components/Loader";

const ServiceCategory = () => {
  const serviceRoot = useSelector((store) => store.serviceRoot);
  const { loader, serviceCategories } = serviceRoot;
  const dispatch = useDispatch();
  const [addServiceCategoryModal, setAddServiceCategoryModal] = useState(false);
  const [updateServiceCategoryModal, setUpdateServiceCategoryModal] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const [data, setData] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [banner, setBanner] = useState("")
  const [bottomSlider, setBottomSlider] = useState("")

  useEffect(() => {
    dispatch(getServiceCategories())
    return () => {
      setServiceSubCategories([])
    }
  }, [])

  const bannerImagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setBanner(img);
    }
  };

  const bottomSliderImagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setBottomSlider(img);
    }
  };

  const uploadImage = (type, serviceCategoryId) => {

    if ((type == "banner") && (banner == "")) {
      alert("Please select banner.")
      return
    }

    if ((type == "bottomSlider") && (bottomSlider == "")) {
      alert("Please select bottom slider.")
      return
    }

    let params = `serviceCategoryId=${serviceCategoryId}`

    if ((type == "banner") && banner) {
      const formData = new FormData();
      formData.append("banner", banner)
      dispatch(addImageToTheServiceCategory(params, formData, () => {
        window.location.reload();
      }))
    }

    if ((type == "bottomSlider") && bottomSlider) {
      const formData = new FormData();
      formData.append("bottomSlider", bottomSlider)
      dispatch(addImageToTheServiceCategory(params, formData, () => {
        window.location.reload();
      }))
    }

  }


  const deleteHandler = (serviceCategory) => {
    const temp_data = {
      _id: serviceCategory._id,
      name: serviceCategory.name,
      actionType: "delete_service_category"
    }
    setData(temp_data)
    setDeleteModal(true)
  }

  const imageDeleteHandler = (_data) => {
    const temp_data = {
      actionType: "delete_image",
      data: _data
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

      {updateServiceCategoryModal && <UpdateServiceCategoryModal
        updateServiceCategoryModal={updateServiceCategoryModal}
        setUpdateServiceCategoryModal={setUpdateServiceCategoryModal}
        data={updateData}
      />}


      {deleteModal && <DeleteModal
        data={data}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />}
      <Container>
        <Row className="my-2">
          <Col >
            <Button onClick={() => setAddServiceCategoryModal(true)}>
              ADD SERVICE-CATEGORY
            </Button>
            {loader ? <Loader /> : null}
          </Col>
        </Row>
        <Row>
          <Col >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No ({serviceCategories.length})</th>
                  <th className="text-center">Index</th>
                  <th className="text-center">Service-Category</th>
                  <th className="text-center">M.C.P</th>
                  <th className="text-center">Partner Share</th>
                  <th className="text-center">Icon Url</th>
                  <th className="text-center">Banners</th>
                  <th className="text-center">Bottom Sliders</th>
                  <th className="text-center">City</th>
                  <th className="text-center">Update</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {serviceCategories.length !== 0 ? serviceCategories.map((serviceCategory, index) =>
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{serviceCategory.index}</td>
                    <td className="text-center"><Link to={`/serviceCategory/${serviceCategory.name}/${serviceCategory._id}`}>{serviceCategory.name}</Link></td>
                    <td className="text-center">{serviceCategory.minAmountForCheckout}</td>
                    <td className="text-center">{serviceCategory.partnerShare ? serviceCategory.partnerShare : null}</td>
                    <td className="text-center"><a href={serviceCategory.iconUrl} target="_blank">{serviceCategory.iconUrl && "url"} </a></td>
                    <td className="text-center">
                      {serviceCategory.banners && serviceCategory.banners.map((d) =>
                        <>
                          <img width="100%" height="10%" src={d.image} />
                          <Button variant="outline-danger" onClick={() => imageDeleteHandler({
                            "url": d.image,
                            "entityId": serviceCategory._id,
                            "module": "SERVICE_CATEGORY",
                            "fieldType": "CHILD_KEY",
                            "fieldName": "banners",
                            "subEntityId": d._id
                          })}>
                            Delete
                          </Button>
                        </>
                      )}
                      <Form.Control
                        accept=".jpg,.png,.jpeg"
                        onChange={bannerImagehandler}
                        type="file"
                      />
                      <Button onClick={() => uploadImage("banner", serviceCategory._id)} variant="outline-danger">Upload</Button>
                    </td>
                    <td className="text-center">
                      {serviceCategory.bottomSliders && serviceCategory.bottomSliders.map((d) =>
                        <>
                          <img width="100%" height="10%" src={d.image} />
                          <Button variant="outline-danger" onClick={() => imageDeleteHandler({
                            "url": d.image,
                            "entityId": serviceCategory._id,
                            "module": "SERVICE_CATEGORY",
                            "fieldType": "CHILD_KEY",
                            "fieldName": "bottomSliders",
                            "subEntityId": d._id
                          })}>
                            Delete
                          </Button>
                        </>
                      )}
                      <Form.Control
                        accept=".jpg,.png,.jpeg"
                        onChange={bottomSliderImagehandler}
                        type="file"
                      />
                      <Button onClick={() => uploadImage("bottomSlider", serviceCategory._id)} variant="outline-danger">Upload</Button>
                    </td>
                    <td className="text-center">{serviceCategory.cities.map(e => e.cityName).join(", ")}</td>
                    <td className="text-center"><Button onClick={() => {
                      setUpdateServiceCategoryModal(true)
                      setUpdateData(serviceCategory)
                    }} variant="outline-info">Update </Button></td>
                    <td className="text-center"><Button onClick={() => deleteHandler(serviceCategory)} variant="outline-info">Delete</Button></td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceCategory;
