import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'


const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

export const setServiceSubCategories = (data) => {
    return {
        type: "SET_SERVICE_SUB_CATEGORIES",
        payload: data
    }
}

export const setServiceCategories = (data) => {
    return {
        type: "SET_SERVICE_CATEGORIES",
        payload: data
    }
}

export const setServices = (data) => {
    return {
        type: "SET_SERVICES",
        payload: data
    }
}

export const addServiceCategory = (serviceCategoryCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/serviceCategory",
                data: serviceCategoryCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE_CATEGORY",
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
            console.log("ADD SERVICE CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const updateServiceCategory = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/serviceCategory/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_SERVICE_CATEGORY",
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
            console.log("UPDATE SERVICE CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


export const getServiceCategories = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceCategory/",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setServiceCategories(data.response))
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
            console.log("GET SERVICE CATEGORIES ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const deleteServiceCategory = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/serviceCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE_CATEGORY",
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
            console.log("DELETE SERVICE CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const addServiceSubCategory = (serviceSubCategoryCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/serviceSubCategory",
                data: serviceSubCategoryCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE_SUB_CATEGORY",
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
            console.log("ADD SERVICE SUB CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


export const updateServiceSubCategory = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/serviceSubCategory/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_SERVICE_SUB_CATEGORY",
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
            console.log("UPDATE SERVICE SUB CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const getServiceSubCategories = (serviceCategoryId) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + `api/v1/serviceSubCategory/serviceCategory/${serviceCategoryId}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE_SUB_CATEGORIES",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET SERVICE SUB CATEGORIES ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const deleteServiceSubCategory = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/serviceSubCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE_SUB_CATEGORY",
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
            console.log("DELETE SERVICE SUB CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const deleteService = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/service/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE",
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
            console.log("DELETE SERVICE ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const getServiceCategory = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + `api/v1/serviceCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SINGLE_SERVICE-CATEGORY",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET SERVICE CATEGORY", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const addService = (serviceCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/service",
                data: serviceCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE",
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
            console.log("ADD SERVICE ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


export const updateService = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/service/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_SERVICE",
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
            console.log("UPDATE SERVICE ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

export const getServices = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + `api/v1/service/${id}`
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setServices(data.response))
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
            console.log("GET SERVICE ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


export const getAllServiceSubCategory = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceSubCategory"
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_ALL_SERVICE_SUB_CATEGORY",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET ALL SERVICE SUB CATEGORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}




