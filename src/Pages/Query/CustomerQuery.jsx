import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerQueries } from "../../redux/actions/commonAction";
import { Col, Container, Row, Table } from "react-bootstrap";
import Loader from "../../Components/Loader";
import { extractDateAndTime } from "../../utils/commonFunction";

const CustomerQuery = () => {
  const dispatch = useDispatch();

  const commonReducer = useSelector((store) => store.root);
  const { loader, customerQueries } = commonReducer;

  useEffect(() => {
    dispatch(getCustomerQueries());
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {loader ? (
            <Loader />
          ) : (
            <>
              {customerQueries.length === 0 ? (
                <h5>Oops.</h5>
              ) : (
                <>
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">
                            S.No ({customerQueries.length})
                          </th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Phone Number</th>
                          <th className="text-center">Email</th>
                          <th className="text-center">Query</th>
                          <th className="text-center">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerQueries.length !== 0
                          ? customerQueries.map((d, index) => (
                              <tr>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{d.name}</td>
                                <td className="text-center">{d.phoneNumber}</td>
                                <td className="text-center">{d.email}</td>
                                <td className="text-center">{d.query}</td>
                                <td className="text-center">{extractDateAndTime(d.createdAt)}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </Table>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CustomerQuery;
