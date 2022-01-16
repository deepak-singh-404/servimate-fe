import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getSliderScreens, setSlidersScreens } from '../../redux/actions/partnerHomeScreen'
import DeleteModal from '../../Components/DeleteModal'
import AddSliderScreenModal from '../../Components/PartnerHomeScreen/AddSliderScreenModal'
import Loader from "../../Components/Loader";

const ScreenSlider = () => {
    const [addSliderScreenModal, setAddSliderScreenModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const { loader, sliderScreens } = useSelector(state => state.partnerHomeScreenRoot)

    const dispatch = useDispatch()

    //GET ALL BANNERS
    useEffect(() => {
        dispatch(getSliderScreens())
        return () => {
            setSlidersScreens([])
        }
    }, [])

    const deleteHandler = (b) => {
        const temp_data = {
            _id: b._id,
            name: b.title,
            actionType: "partner_delete_slider_screen"
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    return (
        <>
            {addSliderScreenModal && <AddSliderScreenModal
                addSliderScreenModal={addSliderScreenModal}
                setAddSliderScreenModal={setAddSliderScreenModal}
            />}

            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            <Container>
                {loader ? <Loader /> : <>
                    {sliderScreens.length === 0 ? <h5>No SLider Screens Found</h5> : <>
                        <Row className="my-2">
                            <Col >
                                <Button onClick={() => setAddSliderScreenModal(true)}>
                                    ADD SLIDER SCREEN
                                </Button>
                            </Col>
                        </Row>
                        <Row>
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
                                        {sliderScreens.map((b, index) =>
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
                        </Row>
                    </>}
                </>}
            </Container>
        </>
    )
}

export default ScreenSlider
