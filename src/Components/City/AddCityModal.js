import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal } from 'react-bootstrap'
import { addCity } from '../../redux/actions/cityAction'
import Loader from '../Loader'

const AddCityModal = ({ addCityModal, setAddCityModal }) => {
    const cityData = useSelector(store => store.cityRoot)
    const { loader, success } = cityData
    const dispatch = useDispatch()
    const [city, setCity] = useState("")
    const [iconUrl, setIconUrl] = useState("");
    const [pinCodes, setPincodes] = useState("")
    const [state, setState] = useState("")

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setIconUrl(img);
        }
    };

    const formHandler = (e) => {
        e.preventDefault()
        if (city && pinCodes && state) {
            // FORMAT CITY, CAPITALIZE EACH WORD OF CITY
            const toTitleCase = (phrase) => {
                return phrase
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            };
            const name = toTitleCase(city);
            const stateName = toTitleCase(state)
            //FORMAT PINCODE,     STRINGS => ARRAY OF NUMBERS
            const zipcodes = pinCodes.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            const formData = new FormData();
            formData.append("name", name);
            if (iconUrl !== "") {
                formData.append("iconUrl", iconUrl);
            }
            formData.append("zipcodes", zipcodes)
            formData.append("state", stateName)
            dispatch(addCity(formData))
        }
        else {
            alert("Fields  should not be empty")
        }
    }


    useEffect(() => {
        if (success) {
            setAddCityModal(false)
        }
    }, [success])

    return (
        <>
            <Modal show={addCityModal} onHide={() => setAddCityModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>CITY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter name of the city" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>State</Form.Label>
                            <Form.Control value={state} onChange={(e) => setState(e.target.value)} type="text" placeholder="Enter name of the state" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ICON</Form.Label>
                            <Form.Control
                                accept=".jpg,.png,.jpeg"
                                onChange={imagehandler}
                                type="file"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Pincodes</Form.Label>
                            <Form.Control onChange={(e) => setPincodes(e.target.value)} value={pinCodes} as="textarea" rows={3} />
                            <Form.Text className="text-muted">
                                Enter Pincodes in below format
                                <br />
                                201301, 201305, 201306
                            </Form.Text>
                        </Form.Group>
                        {loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddCityModal