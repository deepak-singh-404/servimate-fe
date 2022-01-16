import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { getServiceProviders } from "../../redux/actions/serviceProvider";
import { assignServiceProvider } from '../../redux/actions/booking'
import { Typeahead } from 'react-bootstrap-typeahead';
import Loader from '../Loader'

const AssignServiceProviderModal = ({ currentBooking, assignServiceProviderModal, setAssignServiceProviderModal }) => {
  const { serviceProviders } = useSelector((store) => store.serviceProviderRoot)
  const { loader } = useSelector(store => store.serviceProviderRoot)
  const [serviceProvider, setServiceProvider] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServiceProviders());
    return (() => {
      setServiceProvider([])
    })
  }, [])


  const clickHandler = () => {
    if (serviceProvider.length === 1) {
      let data = {
        serviceProviderId: serviceProvider[0]._id,
        serviceProviderName: serviceProvider[0].name,
        bookingId: currentBooking._id,
      }
      dispatch(assignServiceProvider(data, () => {
        setAssignServiceProviderModal(false)
        window.location.reload();
      }))
    }
  }

  return (
    <div>
      <Modal show={assignServiceProviderModal} onHide={() => setAssignServiceProviderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ASSIGN SERVICE PROVIDER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setServiceProvider}
            options={serviceProviders}
            placeholder="Choose ServiceProvider ..."
            selected={serviceProvider}
          />
          <div>
            {loader ? <Loader /> : <Button className="mt-2" onClick={clickHandler}>ASSIGN</Button>}

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default React.memo(AssignServiceProviderModal);
