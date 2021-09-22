import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getHomePageReviews, setHomePageReviews} from '../../redux/actions/homeScreen'
import DeleteModal from '../../Components/DeleteModal'
import HomePageReviewModal from '../../Components/HomeScreen/HomePageReviewModal'


const HomePageReview = () => {
    const [homePageReviewModal, setHomePageReviewModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const {loader, homePageReviews} = useSelector(state => state.homeScreenRoot)

    const dispatch = useDispatch()

    //GET ALL BANNERS
    useEffect(()=>{
        dispatch(getHomePageReviews())
        return ()=>{
            setHomePageReviews([])
        }
      },[])

    const deleteHandler = (b) => {
        const temp_data = {
            _id: b._id,
            name: b.title,
            actionType: "delete_home_page_review"
        }
        setData(temp_data)
        setDeleteModal(true)
    }
    return (
        <>
        {homePageReviewModal && <HomePageReviewModal
            homePageReviewModal={homePageReviewModal}
            setHomePageReviewModal={setHomePageReviewModal}
        />}

        {deleteModal && <DeleteModal
            data={data}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
        />}
        <Container>
            <Row className="mt-5">
                <Col md={2} >
                    <Button onClick={() => setHomePageReviewModal(true)}>
                        ADD HOME PAGE REVIEW
                    </Button>
                </Col>
                <Col md={10} >
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
                            {homePageReviews.length !== 0 ? homePageReviews.map((b, index) =>
                                <tr>
                                    <td className="text-center">{index +  1}</td>
                                    <td className="text-center"><a href={b.picture} target="_blank">{b.picture && "picture"} </a></td>
                                    <td className="text-center">{b.title}</td>
                                    <td className="text-center"><Button onClick={()=>deleteHandler(b)} variant="outline-info">Delete</Button></td>
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

export default HomePageReview
