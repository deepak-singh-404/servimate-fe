import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Loader"
import { getCities } from "../../redux/actions/cityAction"
import { sendNotificationOnApp } from "../../redux/actions/commonAction"


const NOTIFICATION_TYPES = ["INDIVIDUAL", "BASED_ON_CITY"]


const AppNotificationModal = ({ appNotificationModal, setAppNotificationModal }) => {
    const dispatch = useDispatch()
    const { cities } = useSelector(store => store.cityRoot)
    const { loader } = useSelector(store => store.root)
    const [notificationType, setNotificationType] = useState("")
    const [cityId, setCityId] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
        const reqPayload = {
            "title": title,
            "description": description
        }
        if (notificationType === "BASED_ON_CITY") {
            reqPayload["cityId"] = cityId
        }
        if (notificationType === "INDIVIDUAL") {
            reqPayload["phoneNumber"] = "+91" + phoneNumber
        }
        dispatch(sendNotificationOnApp(notificationType, reqPayload, () => {
            alert("Sent successfully.")
            setAppNotificationModal(false)
            return
        }))
    }

    useEffect(() => {
        if (notificationType === "BASED_ON_CITY") {
            dispatch(getCities())
        }
    }, [notificationType])

    return (<>
        <Modal
            show={appNotificationModal}
            onHide={() => setAppNotificationModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>APP NOTIFICATION</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formHandler}>
                    <Form.Group>
                        <Form.Label>Notification Type</Form.Label>
                        <Form.Control
                            onChange={(e) => setNotificationType(e.target.value)} as="select">
                            <option>Select</option>
                            {NOTIFICATION_TYPES.length !== 0 ? NOTIFICATION_TYPES.map(c =>
                                <option value={c}>{c}</option>
                            ) : null}
                        </Form.Control>
                    </Form.Group>
                    {notificationType === "BASED_ON_CITY" && <Form.Group >
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={(e) => setCityId(e.target.value)} as="select">
                            <option>Select</option>
                            {cities.length !== 0 ? cities.map(c =>
                                <option value={c._id}>{c.name}</option>
                            ) : null}
                        </Form.Control>
                    </Form.Group>}

                    {notificationType === "INDIVIDUAL" && <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text"
                        />
                    </Form.Group>}
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                        />
                    </Form.Group>
                    {loader ? (
                        <Loader />
                    ) : (
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    </>)
}

export default AppNotificationModal