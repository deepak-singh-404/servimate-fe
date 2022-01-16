import React, { useState, useEffect } from 'react'
import googleApikey from '../utils/googleapi'
import Geocode from 'react-geocode'
import {useDispatch, useSelector} from 'react-redux'
import {userRegister} from '../redux/actions/adminAction'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'


//Component
import Loader from '../Components/Loader'

Geocode.setApiKey(googleApikey)
Geocode.enableDebug()


const UserRegistration = () => {
    const dispatch  =  useDispatch()
    const data = useSelector((store)=>store.userRoot)

    const {loader} = data

    const [user, setUser] =  useState({name:"",
     email:"",
     password:"",
     phoneNumber:"",
     address: ""
    })

    const [location, setLocation] = useState("")

    const getLocationHelper = ()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then((res) => {
                    setLocation(res.result[0])
                })
            })
        } else {
            alert("Pls turn on your location")
        }
    }

    useEffect(() => {
        getLocationHelper()
    }, [])
    
    const formHandler = (e)=>{
        e.preventDefault()
        if(user.address){
            dispatch(userRegister(user))
        }
        else{
            alert("Your location is turned off or please refresh page")
        }
        
    }

    // console.clear()

    return (
        <Container >
            <Row className="mt-5">
                <Col md={8} className="m-auto">
                <h1>WELCOME TO SERVIMATE</h1>
            <Form onSubmit={formHandler}> 
               <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={user.phoneNumber} onChange={(e)=>setUser({...user, phoneNumber:e.target.value})} type="text" placeholder="Enter PhoneNumber"/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})} type="password" placeholder="Enter password" />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}
                {/* <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group> */}
                {loader ? <Loader /> : <Button variant="primary" type="submit">
                    Submit
                </Button>}
            </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UserRegistration