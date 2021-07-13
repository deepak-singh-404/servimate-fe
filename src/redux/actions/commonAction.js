import axios from 'axios'
const url =  'https://servimate-admin.herokuapp.com'
const local_url = 'http://localhost:4000'



const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

export const getAbandonedCart = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "/dev/api/v1/abandonedCart",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_ABANDONED_CART",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("Error in a getAbandonedCart", err.message)
        }
    }
}

export const getCustomers = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "/dev/api/v1/customer",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CUSTOMERS",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("Error in a getCustomers", err.message)
        }
    }
}

