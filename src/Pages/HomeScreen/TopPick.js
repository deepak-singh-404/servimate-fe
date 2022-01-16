import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getTopPicks, setTopPicks } from '../../redux/actions/homeScreen'
import DeleteModal from '../../Components/DeleteModal'
import TopPickModal from '../../Components/HomeScreen/TopPickModal'
import Loader from "../../Components/Loader";


const TopPick = () => {
    const [topPickModal, setTopPickModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const { loader, topPicks } = useSelector(state => state.homeScreenRoot)

    const dispatch = useDispatch()

    //GET ALL BANNERS
    useEffect(() => {
        dispatch(getTopPicks())
        return () => {
            setTopPicks([])
        }
    }, [])

    const deleteHandler = (b) => {
        const temp_data = {
            _id: b._id,
            name: b.title,
            actionType: "delete_top_pick"
        }
        setData(temp_data)
        setDeleteModal(true)
    }
    return (
        <>
            {topPickModal && <TopPickModal
                topPickModal={topPickModal}
                setTopPickModal={setTopPickModal}
            />}

            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            <Container>
                <Row className="my-2">
                    <Col>
                        <Button onClick={() => setTopPickModal(true)}>
                            ADD TOP PICK
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {topPicks.length === 0 ? <h5>No TopPicks Found</h5> : <>
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
                                        {topPicks.map((b, index) =>
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

export default TopPick
