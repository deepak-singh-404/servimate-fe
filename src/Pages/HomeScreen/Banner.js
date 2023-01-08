import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getBanners, setBanners } from '../../redux/actions/homeScreen'
import DeleteModal from '../../Components/DeleteModal'
import AddBannerModal from '../../Components/HomeScreen/AddBannerModal'
import Loader from "../../Components/Loader";
import { getCities } from "../../redux/actions/cityAction";

const Banner = () => {
    const [addBannerModal, setAddBannerModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [city, setCity] = useState("")
    const { loader, banners } = useSelector(state => state.homeScreenRoot)
    const cities = useSelector((store) => store.cityRoot.cities)
    const dispatch = useDispatch()
    const [_banners, _setBanners] = useState([])

    //GET ALL BANNERS
    useEffect(() => {
        dispatch(getBanners())
        dispatch(getCities())
        return () => {
            setBanners([])
        }
    }, [])

    //INITIAL DATA
    useEffect(() => {
        if (banners) {
            _setBanners(banners)
        }
    }, [banners])

    //Filter As Per City
    useEffect(() => {
        if (city == "Select" || city == "") {
            _setBanners(banners)
        }
        else {
            const filteredData = banners.filter((b) => b?.city == city)
            _setBanners(filteredData)
        }
    }, [city])


    const deleteHandler = (b) => {
        const temp_data = {
            _id: b._id,
            name: b.title,
            actionType: "delete_banner"
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    return (
        <>
            {addBannerModal && <AddBannerModal
                addBannerModal={addBannerModal}
                setAddBannerModal={setAddBannerModal}
            />}

            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            <Container>
                <Row className="my-2">
                    <Col md={2} >
                        <Button onClick={() => setAddBannerModal(true)}>
                            ADD BANNER
                        </Button>
                    </Col>
                    <Col md={3} >
                        <Form.Group >
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={(e) => setCity(e.target.value)} as="select">
                                <option>Select</option>
                                {cities.length !== 0 ? cities.map(c =>
                                    <option value={c.name}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {_banners.length === 0 ? <h5>No Banners Found</h5> : <>
                            <Col  >
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="text-center">S.No</th>
                                            <th className="text-center">Picture</th>
                                            <th className="text-center">Title</th>
                                            <th className="text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_banners.map((b, index) =>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center"><a href={b.picture} target="_blank">{b.picture && "picture"} </a></td>
                                                <td className="text-center">{b.title}</td>
                                                <td className="text-center"><Button onClick={() => deleteHandler(b)} variant="outline-info">Delete</Button></td>
                                            </tr>
                                        )}
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

export default Banner
