import axios from 'axios'
const url =  'https://servimate-admin.herokuapp.com/dev'
//const url = 'http://localhost:4000/'


const aws_url = "https://servimate-admin.herokuapp.com/dev"

const loader = (data) => {
    return {
        type: "SET_LOADER",
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

export const assignServiceProvider = (cred, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: aws_url + "/api/v1/assignServiceProvider",
                data: cred
            })
            dispatch(loader(false))
            if (data.success) {
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

