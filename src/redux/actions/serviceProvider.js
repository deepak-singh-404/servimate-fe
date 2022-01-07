import axios from 'axios'
import {local_url, prod_url} from '../../config/constant'

// COMMON LOADER
const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

// ADD SERVICE PROVIDER
export const addServiceProvider = (serviceProviderCredentials, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/serviceProvider",
                data: serviceProviderCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICEPROVIDER",
                    payload: data.response
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD SERVICE PROVIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET ALL SERVICE PROVIDERS
export const getServiceProviders = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceProvider",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICEPROVIDERS",
                    payload: data.response
                })
                dispatch({
                    type: "SET_SUCCESS",
                    payload: true
                })
                dispatch({
                    type: "SET_SUCCESS",
                    payload: false
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET SERVICE PROVIDERS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE SERVICE PROVIDER
export const deleteServiceProvider = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/serviceProvider/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                console.log("insode", data)
                dispatch({
                    type: "DELETE_SERVICE_PROVIDER",
                    payload: data.response._id
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("DELETE SERVICE PROVIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET ALL PARTNER REGISTRATION REQUEST
export const getRegistrationRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceProvider/registrationRequest",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_REGISTRATION_REQUEST",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET REGISTRATION REQUEST ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//REVIEW PARTNER REGISTRATION REQUEST
export const reviewRegistrationRequest = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/serviceProvider/registrationRequest/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "REVIEW_REGISTRATION_REQUEST",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("REVIEW REGISTRATION REQUEST ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//UPDATE SERVICE PROVIDER
export const updateServiceProvider = (_data, id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/serviceProvider/single/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_SERVICE_PROVIDER",
                    payload: data.response
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("UPDATE SERVICE PROVIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//UPDATE SERVICEPROVIDER WALLET
export const updatePartnerWallet = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/serviceProvider/wallet/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_SERVICE_PROVIDER",
                    payload: data.response
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("UPDATE PARTNER WALLET ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

