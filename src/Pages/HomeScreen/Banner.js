import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import {getBanners, setBanners } from '../../redux/actions/homeScreen'
import DeleteModal from '../../Components/DeleteModal'
import AddBannerModal from '../../Components/HomeScreen/AddBannerModal'

const Banner = () => {
    const [addBannerModal, setAddBannerModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const {loader, banners} = useSelector(state => state.homeScreenRoot)

    const dispatch = useDispatch()

    //GET ALL BANNERS
    useEffect(()=>{
        dispatch(getBanners())
        return ()=>{
          setBanners([])
        }
      },[])

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
                <Row className="mt-5">
                    <Col md={2} >
                        <Button onClick={() => setAddBannerModal(true)}>
                            ADD BANNER
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
                                {banners.length !== 0 ? banners.map((b, index) =>
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

export default Banner
