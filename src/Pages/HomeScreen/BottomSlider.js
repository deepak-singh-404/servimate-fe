import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getBottomSliders, setBottomSliders } from '../../redux/actions/homeScreen'
import DeleteModal from '../../Components/DeleteModal'
import AddBottomSliderModal from '../../Components/HomeScreen/AddBottomSliderModal'
import Loader from "../../Components/Loader";

const BottomSlider = () => {
    const [addBottomSliderModal, setAddBottomSliderModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const { loader, bottomSliders } = useSelector(state => state.homeScreenRoot)

    const dispatch = useDispatch()

    //GET ALL BANNERS
    useEffect(() => {
        dispatch(getBottomSliders())
        return () => {
            setBottomSliders([])
        }
    }, [])

    const deleteHandler = (b) => {
        const temp_data = {
            _id: b._id,
            name: b.title,
            actionType: "delete_bottom_slider"
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    return (
        <>
            {addBottomSliderModal && <AddBottomSliderModal
                addBottomSliderModal={addBottomSliderModal}
                setAddBottomSliderModal={setAddBottomSliderModal}
            />}

            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            <Container>
                <Row className="my-2">
                    <Col >
                        <Button onClick={() => setAddBottomSliderModal(true)}>
                            ADD BOTTOM SLIDER
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {bottomSliders.length === 0 ? <h5>No BottomSliders Found</h5> : <>
                            <Col >
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
                                        {bottomSliders.map((b, index) =>
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

export default BottomSlider
