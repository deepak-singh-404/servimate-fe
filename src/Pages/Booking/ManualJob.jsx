import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Loader from '../../Components/Loader'
import AddJobManuallyModal from "../../Components/Booking/AddJobManuallyModal";


const ManualJob = () => {
    const [addManualJobModal, setAddManulJobModal] = useState(false)

    return (
        <>
            {addManualJobModal && <AddJobManuallyModal addManualJobModal={addManualJobModal} setAddManulJobModal={setAddManulJobModal} />}
            <Container fluid>
                <Row className="my-2">
                    <Col >
                        <Button variant="primary" type="button" onClick={() => setAddManulJobModal(true)}>ADD JOB MANUALLY</Button>
                        {false ? <Loader /> : null}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ManualJob;