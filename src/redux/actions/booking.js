import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'

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

export const healthCheck = () => {
    return async () => {
        try {
            const { data } = await axios({
                method: "Get",
                url: prod_url
            })
        }
        catch (err) {
            alert("Server is not healthy")
        }
    }
}

//GET NEW BOOKINGS
export const getNewBookings = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/newBookings",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_NEW_BOOKINGS",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET NEW BOOKINGS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADMIN CANCEL BOOKING
export const adminCancelBooking = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + `dev/api/v1/adminCancelService`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "ADMIN_CANCEL_BOOKING",
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
            console.log("ADMIN CANCEL BOOKING ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET CURRENT BOOKINGS
export const getCurrentBookings = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/bookings",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CURRENT_BOOKINGS",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET CURRENT BOOKINGS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET BOOKING HISTORY
export const getBookingHistory = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/bookingHistory",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_BOOKING_HISTORY",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET BOOKING HISTORY ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET CANCELLATION REQUEST
export const getCancellationRequest = (_data) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/cancellationRequest",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setCancellationRequest(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET CANCELLATION REQUEST ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//APPROVE CANCELLATION REQUEST
export const approveCancellationRequest = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + `dev/api/v1/approveCancellationRequest/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("APPROVE CANCELLATION REQUEST ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ASSIGN SERVICE PROVIDER
export const assignServiceProvider = (cred, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "dev/api/v1/assignServiceProvider",
                data: cred
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(loader(false))
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ASSIGN SERVICE PROVIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET ALL OUTOFREACH BOOKINGS
export const getOutOfReachBookings = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/bookings/outofreach",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_OUT_OF_REACH_BOOKINGS",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET OUT OF REACH BOOKINGS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


//ADD JOB MANUALLY
export const adminAddJobManually = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "dev/api/v1/manual/bookService",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "ADMIN_ADD_JOB_MANUALLY",
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
        }
    }
}

//MANUALLY ADDDED JOBS
export const adminManuallyAddedJobs = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/manual/bookings",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "MANUALLY_ADDED_JOBS",
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
        }
    }
}