import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/actions/adminAction'
import { NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'


const AdminNavbar = () => {
    const admin = useSelector(store => store.adminRoot.admin)
    const { name } = admin
    const history = useHistory()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
        history.push('/')
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">SERVIMATE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to={`/profile`}>{name.toUpperCase()}</Link></Nav.Link>
                        <Nav.Link><Link to="/serviceCategory">SERVICE CATEGORY</Link></Nav.Link>
                        <Nav.Link><Link to="/serviceProvider">SERVICE PROVIDER</Link></Nav.Link>
                        <Nav.Link><Link to="/city">CITY</Link></Nav.Link>
                        <Nav.Link><Link to="/voucher">VOUCHER</Link></Nav.Link>
                        <NavDropdown title="CUSTOMER" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/customer">Customers</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/abandonedCart">Abandoned Cart</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="BOOKING" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/booking/new">New Bookings</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/booking/current">Current Bookings</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/booking/history">Bookings History</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/cancellationRequests">Cancellation Requests</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Button} onClick={logoutHandler} variant="outline-danger">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default React.memo(AdminNavbar)