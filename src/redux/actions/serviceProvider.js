import axios from 'axios'
const url =  'https://servimate-admin.herokuapp.com/'
const local_url = 'http://localhost:4000/'



const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}


export const addServiceProvider = (serviceProviderCredentials,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/serviceProvider",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a AddServiceProvider", err.message)
        }
    }
}

export const getServiceProviders = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "api/v1/serviceProvider",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getServiceProviders", err.message)
        }
    }
}

export const deleteServiceProvider = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/serviceProvider/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                console.log("insode",data)
                dispatch({
                    type: "DELETE_SERVICE_PROVIDER",
                    payload: data.response._id
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteServiceProvider", err.message)
        }
    }
}

