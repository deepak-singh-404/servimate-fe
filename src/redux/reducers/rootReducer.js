import { combineReducers } from 'redux';
import adminReducer from './adminReducer'
import cityReducer from './cityReducer'
import serviceReducer from './serviceReducer'
import serviceProvider from './serviceProvider'
import voucher from './voucher'
import booking from './booking'
import commonReducer from './commonReducer';
import homeScreen from './homeScreen'
import partnerHomeScreen from './partnerHomeScreen'



export default combineReducers({
    adminRoot: adminReducer,
    cityRoot: cityReducer,
    serviceRoot: serviceReducer,
    serviceProviderRoot: serviceProvider,
    voucherRoot: voucher,
    bookingRoot: booking,
    homeScreenRoot: homeScreen,
    partnerHomeScreenRoot: partnerHomeScreen,
    root: commonReducer
});