import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { getServiceProviders } from "../../redux/actions/serviceProvider";
import { assignServiceProvider } from '../../redux/actions/booking'
import { Typeahead } from 'react-bootstrap-typeahead';
import Loader from '../Loader'

const AssignServiceProviderModal = ({ currentBooking, assignServiceProviderModal, setAssignServiceProviderModal }) => {
  let serviceProviders = useSelector((store) => store.serviceProviderRoot.serviceProviders)
  let [serviceP, setServiceP] = useState([])
  const { loader } = useSelector(store => store.serviceProviderRoot)
  const [serviceProvider, setServiceProvider] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServiceProviders());
    if (serviceProviders) {
      setServiceP(serviceProviders)
    }
    return (() => {
      setServiceProvider([])
    })
  }, [])

  useEffect(() => {
    if (serviceProviders.length > 0) {
      //Get the zipcode and serviceCategory from current booking.
      const bookingZipcode = currentBooking.address.zipcode
      const bookingServiceCategory = currentBooking.services[0].serviceCategory
      //Filter all service providers who serve above service at above location.

      let _serviceProviders = []
      for (const sp of serviceProviders) {
        let serviceCategoryMatch = false
        let zipcodeMatch = false

        //Handle serviceCategory
        if (bookingServiceCategory) {
          for (const sc of sp.serviceCategoryId) {
            if (sc._id == bookingServiceCategory) {
              serviceCategoryMatch = true
            }
          }
        }

        //Handler pincode
        if (bookingZipcode) {
          for (const zc of sp.zipcodes) {
            if (zc == bookingZipcode) {
              zipcodeMatch = true
            }
          }
        }

        if (serviceCategoryMatch && zipcodeMatch) {
          _serviceProviders.push(sp)
        }
      }
      setServiceP(_serviceProviders)
    }

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
            options={serviceP}
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
