import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'

const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

//ADD CITY
export const addCity = (cityCredentials) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/city",
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
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD CITY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//UPDATE CITY
export const updateCity = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `api/v1/city/${id}`,
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
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("UPDATE CITY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET CITIES
export const getCities = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/city",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CITIES",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET CITIES ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE CITY
export const deleteCity = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/city/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_CITY",
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
            console.log("DELETE CITY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}