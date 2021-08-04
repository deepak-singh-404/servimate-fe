import axios from 'axios'
const url = 'https://servimate-admin.herokuapp.com/'
const dev_url = "https://servimate-server-admin-dev.herokuapp.com/"
const local_url = 'http://localhost:4000/'


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



export const addServiceCategory = (serviceCategoryCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: local_url + "api/v1/serviceCategory",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a addServiceCategoryAction", err.message)
        }
    }
}

export const getServiceCategories = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "api/v1/serviceCategory/",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE_CATEGORIES",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getServiceCategories", err.message)
        }
    }
}

export const deleteServiceCategory = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/serviceCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE_CATEGORY",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteServiceCategory", err.message)
        }
    }
}

export const addServiceSubCategory = (serviceSubCategoryCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: local_url + "api/v1/serviceSubCategory",
                data: serviceSubCategoryCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type:"SET_SERVICE_SUB_CATEGORY",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a addServiceSubCategoryAction", err.message)
        }
    }
}

export const getServiceSubCategories = (serviceCategoryId) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + `api/v1/serviceSubCategory/serviceCategory/${serviceCategoryId}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SERVICE_SUB_CATEGORIES",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getServiceCategories", err.message)
        }
    }
}

export const deleteServiceSubCategory = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/serviceSubCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE_SUB_CATEGORY",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteServiceSubCategory", err.message)
        }
    }
}

export const deleteService = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/service/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_SERVICE",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteService", err.message)
        }
    }
}


export const getServiceCategory = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + `api/v1/serviceCategory/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_SINGLE_SERVICE-CATEGORY",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getServiceCategories", err.message)
        }
    }
}

export const addService = (serviceCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            console.log("serviceCredential-----------------------------------", serviceCredentials)
            const { data } = await axios({
                method: "Post",
                url: local_url + "api/v1/service",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a AddServiceAction", err.message)
        }
    }
}

export const getServices = (id) => {
    return async (dispatch) => {
        try {
            console.log("id--------------------------------", id)
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + `api/v1/service/${id}`
            })
            dispatch(loader(false))
            if (data.success) {
                console.log("Services", data)
                dispatch({
                    type: "SET_SERVICES",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured in getServices")
            console.log("Error in a getServices", err.message)
        }
    }
}

export const getAllServiceSubCategory = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "dev/api/v1/serviceSubCategory"
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_ALL_SERVICE_SUB_CATEGORY",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured in getAllServiceSubCategory")
            console.log("Error in a getAllServiceSubCategory", err.message)
        }
    }
}




