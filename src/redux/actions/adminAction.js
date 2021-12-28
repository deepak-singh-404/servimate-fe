import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'
const url =  'https://servimate-admin.herokuapp.com/'
//const url = 'http://localhost:4000/'


export const adminLoginHelper = (data) => {
    return {
        type: "SET_ADMIN_DATA",
        payload: data
    }
}


const adminLogoutHelper = (data) => {
    return {
        type: "DELETE_ADMIN_DATA",
        payload: data
    }
}


const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}


export const adminRegister = (adminRegisterCredentials, history) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/admin/register",
                data: adminRegisterCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                const { token } = data
                localStorage.setItem('servimateToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(adminLoginHelper(decoded.admin))
                history.push('/home')
            }
            alert(data.message)
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in adminRegister Action", err.message)
        }

    }
}


export const adminLogin = (adminLoginCredentials, history) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/admin/login",
                data: adminLoginCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                const { token } = data
                localStorage.setItem('servimateToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(adminLoginHelper(decoded))
                history.push('/booking/new')
            }
            alert(data.message)
        }
        catch (err) {
            dispatch(loader(true))
            console.log("Error in adminLogin Action", err.message)
        }

    }
}


export const adminLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('servimateToken');
        setAuthToken(false);
        dispatch(adminLogoutHelper({}));
    }
}

