import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/actions/adminAction'
import { NavDropdown, Navbar, Nav, Button } from 'react-bootstrap'


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
                        <NavDropdown title="CUSTOMER APP" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/serviceCategory">SERVICE CATEGORY</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/city">CITY</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/voucher">VOUCHER</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/homeScreen/banner">BANNER</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/homeScreen/bottomSlider">BOTTOM SLIDER</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/homeScreen/topPick">TOP PICK</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/homeScreen/homeScreenReview">HOME SCREEN REVIEW</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="PARTNER" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/partner">SERVICE PROVIDER</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/partner/registrationRequest">REGISTRATION REQUEST</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/partner/homeScreen/banner">HOME SCREEN BANNER</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/partner/screen/slider">SLIDER SCREEN</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="CUSTOMER" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/customer">CUSTOMERS</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/abandonedCart">ABANDONED CART</Link></NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="BOOKING" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/booking/new">NEW BOOKINGS</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/booking/current">CURRENT BOOKINGS</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/booking/history">BOOKING HISTORY</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/cancellationRequests">CANCELLATION REQUEST</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Button} onClick={logoutHandler} variant="outline-danger">LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default React.memo(AdminNavbar)