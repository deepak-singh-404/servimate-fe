import React from 'react';
import {useSelector} from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {adminLoginHelper, adminLogout} from './redux/actions/adminAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components
import AdminRegistration from './Pages/AdminRegistration'
import  AdminLogin from './Pages/AdminLogin'
import Navbar  from './Components/Navbar'
import Home from './Pages/Home'
import City from './Pages/City'
import Service from './Pages/Service/Service'
import ServiceProvider from './Pages/ServiceProvider/ServiceProvider'
import Voucher from './Pages/Voucher/Voucher'
import ServiceCategory from './Pages/Service/ServiceCategory'
import ServiceSubCategory from './Pages/Service/ServiceSubCategory'
import NewBooking from './Pages/Booking/NewBooking'
import CancellationRequest from './Pages/Booking/CancellationRequest';
import AbandonedCart from './Pages/AbandonedCart/AbandonedCart'
import Customer from './Pages/Customer/Customer'
import Footer from './Components/Footer/Footer'
import CurrentBooking from './Pages/Booking/CurrentBooking';
import BookingHistory from './Pages/Booking/BookingHistory'
import Banner from './Pages/HomeScreen/Banner'



if (window.localStorage.servimateToken) {
  setAuthToken(localStorage.servimateToken);
  const decoded = jwt_decode(localStorage.servimateToken);
  store.dispatch(adminLoginHelper(decoded.admin))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(adminLogout());
    window.location.href = '/';
  }
}




function App() {
  const store = useSelector(store => store.adminRoot)
  return (
    <div className="App">
      <Router>
        {store.isAuthenticated ? <Navbar /> : null}
        <Switch>
          <Route exact path='/' component={AdminLogin} />
          <Route exact path='/register' component={AdminRegistration} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/city' component={City} />
          <Route exact path='/serviceProvider' component={ServiceProvider} />
          <Route exact path='/voucher' component={Voucher} />
          <Route exact path='/serviceCategory' component={ServiceCategory} />
          <Route exact path="/serviceCategory/:serviceCategoryName/:serviceCategoryId" component={ServiceSubCategory}/>
          <Route exact path='/serviceSubCategory/:serviceSubCategoryName/:serviceSubCategoryId' component={Service} />
          <Route exact path='/booking/new' component={NewBooking} />
          <Route exact path='/booking/current' component={CurrentBooking} />
          <Route exact path='/booking/history' component={BookingHistory} />
          <Route exact path='/cancellationRequests' component={CancellationRequest} />
          <Route exact path="/abandonedCart" component={AbandonedCart} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/homeScreen/banner" component={Banner} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;

