import axios from 'axios'
const url = 'https://servimate-admin.herokuapp.com/dev'
//const url = 'http://localhost:4000/'


const aws_url = "https://servimate-admin.herokuapp.com/dev"

const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

export const setCancellationRequest = (data) => {
    return {
        type: "SET_CANCELLATION_REQUEST",
        payload: data
    }
}


export const getNewBookings = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "/api/v1/newBookings",
            })
            console.log("newBookings", data)
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_NEW_BOOKINGS",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getNewBookings", err.message)
        }
    }
}

export const getCurrentBookings = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "/api/v1/bookings",
            })
            console.log("currentBookings", data)
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CURRENT_BOOKINGS",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getCurrentBookings", err.message)
        }
    }
}

export const getBookingHistory = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "/api/v1/bookingHistory",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_BOOKING_HISTORY",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getBookingHistory", err.message)
        }
    }
}

export const getCancellationRequest = (_data) => {
    return async (dispatch) => {
        if(_data['isServiceProviderAssigned'] === true || _data['isServiceProviderAssigned'] === 'true' ){
            _data['isServiceProviderAssigned'] = true
        }
        else{
            _data['isServiceProviderAssigned'] = false
        }
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "/api/v1/cancellationRequest",
                data:_data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setCancellationRequest(data.response))
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured in getCancellationRequest")
            console.log("Error in a getCancellationRequest", err)
        }
    }
}

export const assignServiceProvider = (cred, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "/api/v1/assignServiceProvider",
                data: cred
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(loader(false))
                //update the reducer
                cb()

                //updated 
                // dispatch({
                //     type: "SET_NEW_BOOKINGS",
                //     payload: data.response
                // })
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a assignServiceProvider", err)
        }
    }
}

