import axios from 'axios'
const url =  'https://servimate-admin.herokuapp.com/'
const local_url = 'http://localhost:4000/'


const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}


export const addCity = (cityCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/city",
                data: cityCredentials
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CITY",
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
            console.log("Error in a AddCityaction", err.message)
        }
    }
}

export const updateCity = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: local_url + `api/v1/city/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_CITY",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a updateCityaction", err.message)
        }
    }
}

export const getCities = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "api/v1/city",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CITIES",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getCitiesAction", err.message)
        }
    }
}


export const deleteCity = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/city/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_CITY",
                    payload: data.response._id
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteCity", err.message)
        }
    }
}