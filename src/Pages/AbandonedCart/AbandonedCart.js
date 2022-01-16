import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getAbandonedCart } from "../../redux/actions/commonAction";
import Loader from "../../Components/Loader";


const Abandoned = () => {
  const { loader, abandonedCart } = useSelector(store => store.root)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAbandonedCart())
  }, [])
  return (
    <>
      <Container>
        <Row className="mt-5">
          {loader ? <Loader /> : <>
            {abandonedCart.length === 0 ? <h5>No Customers Found</h5> : <>
              <Col md={10} className='m-auto'>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">S.No ({abandonedCart.length})</th>
                      <th className="text-center">Customer Name</th>
                      <th className="text-center">Phone Number</th>
                      <th className="text-center">Items In Cart</th>
                      <th className="text-center">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abandonedCart.map((a, index) => (
                      <tr key={a._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{a.name}</td>
                        <td className="text-center">{a.phoneNumber}</td>
                        <td className="text-center">{a.cart.length}</td>
                        <td className="text-center">{a.cart.map(o => <>{o.serviceName} <br /></>)}</td>
                      </tr>
                    ))
                    }
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

export default Abandoned



