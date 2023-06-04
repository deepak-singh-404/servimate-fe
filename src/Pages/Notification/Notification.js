import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AppNotificationModal from "../../Components/Notification/AppNotificationModal";

const Notification = () => {
    const [appNotificationModal, setAppNotificationModal] = useState(false)
    return (<>
        {appNotificationModal && <AppNotificationModal
            appNotificationModal={appNotificationModal}
            setAppNotificationModal={setAppNotificationModal} />}
        <Container>
            <Row className="my-2">
                <Col >
                    <Button onClick={() => setAppNotificationModal(true)}>
                        App Notification
                    </Button>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Notification