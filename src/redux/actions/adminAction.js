import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'

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

//ADMIN REGISTER
export const adminRegister = (adminRegisterCredentials, history) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/admin/register",
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
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD ADMIN ", err.response.data)
            alert(err.response.data.message)
        }

    }
}

//ADMIN LOGIN
export const adminLogin = (adminLoginCredentials, history) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/admin/login",
                data: adminLoginCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                const { token } = data
                localStorage.setItem('servimateToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                console.log("decoded", decoded)
                dispatch(adminLoginHelper(decoded))
                history.push('/booking/new')
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADMIN LOGIN ", err.response.data)
            alert(err.response.data.message)
        }

    }
}

//ADMIN LOGOUT
export const adminLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('servimateToken');
        setAuthToken(false);
        dispatch(adminLogoutHelper({}));
    }
}

