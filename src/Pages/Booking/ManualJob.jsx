import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Loader from '../../Components/Loader'
import AddJobManuallyModal from "../../Components/Booking/AddJobManuallyModal";
import { adminManuallyAddedJobs } from "../../redux/actions/booking";


const ManualJob = () => {
    const [addManualJobModal, setAddManulJobModal] = useState(false)
    const { loader, manuallyAddedJobs } = useSelector((store) => store.bookingRoot);


    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(adminManuallyAddedJobs())
    },[])

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
                {loader ? <Loader /> : <>
          {manuallyAddedJobs.length === 0 ? <h5>No Bookings Found</h5> :
            <>
              <Row className="mt-5">
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="text-center">S.No ({manuallyAddedJobs.length})</th>
                        <th className="text-center">Booking Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {manuallyAddedJobs.length !== 0 ? (
                        manuallyAddedJobs.map((b, index) => (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{b.bookingId}</td>
                          </tr>
                        ))
                      ) : (
                        <h5 className="text-center">Oops No new bookings found</h5>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          }
        </>}

            </Container>
        </>
    )
}

export default ManualJob;