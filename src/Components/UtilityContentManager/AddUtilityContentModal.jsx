import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap'
import Loader from "../Loader";
import { utilityContentTypes } from "../../config/constant";
import { addUtilityContent } from "../../redux/actions/commonAction";

const AddUtilityContentModal = ({ addUtilityContentModal, setAddUtilityContentModal }) => {
    const [contentType, setContentType] = useState("")
    const [index, setIndex] = useState("")
    const [title, setTitle] = useState("")
    const [picture, setPicture] = useState("")
    const [redirectionUrl, setRedirectionUrl] = useState("")
    const dispatch = useDispatch();
    const { loader } = useSelector(store => store.homeScreenRoot)

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setPicture(img);
        }
    };

    const formHandler = async (e) => {
        e.preventDefault();
        if (picture == "") {
            alert("Fields are empty.")
            return;
        }
        const formData = new FormData();
        formData.append("picture", picture);
        let params = `contentType=${contentType}&title=${title}&index=${index}&redirectionUrl=${redirectionUrl}`
        dispatch(addUtilityContent(params, formData, () => {
            setAddUtilityContentModal(false)
        }))
        return;
    }

    return (
        <div>
            <Modal
                show={addUtilityContentModal}
                onHide={() => setAddUtilityContentModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>UTILITY CONTENT MANAGER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>

                        <Form.Group >
                            <Form.Label>UTLITY CONTENT TYPE</Form.Label>
                            <Form.Control required onChange={(e) => setContentType(e.target.value)} as="select">
                                <option>Select</option>
                                {utilityContentTypes.map(d =>
                                    <option value={d.value}>{d.title}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Index</Form.Label>
                            <Form.Control
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Redirection endpoint</Form.Label>
                            <Form.Control
                                value={redirectionUrl}
                                onChange={(e) => setRedirectionUrl(e.target.value)}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                                accept=".jpg,.png,.jpeg"
                                onChange={imagehandler}
                                type="file"
                            />
                        </Form.Group>
                        {loader ? (
                            <Loader />
                        ) : (
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddUtilityContentModal
