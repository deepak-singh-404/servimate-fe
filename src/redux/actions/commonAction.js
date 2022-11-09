import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'

const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

//GET ABANDONED CART
export const getAbandonedCart = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/abandonedCart",
            })
            dispatch(loader(false))
            if (data.success) {
                let res = data.response
                res.sort((a, b) => (a.cart[0].createdAt < b.cart[0].createdAt) ? 1 : ((b.cart[0].createdAt < a.cart[0].createdAt) ? -1 : 0))
                dispatch({
                    type: "SET_ABANDONED_CART",
                    payload: res
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET ABANDONED CART ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET CUSTOMERS
export const getCustomers = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/customer",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CUSTOMERS",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET CUSTOMERS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}


//REVIEW ADMIN ACTION
export const reviewAdminAction = (_data, index) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "dev/api/v1/customer/adminAction",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_ABANDONED_CART",
                    payload: data.response,
                    index: index
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("REVIEW ADMIN ACTION ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET ALL REFER AND EARN CONFIG
export const getAllReferAndEarnConfig = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/config/referAndEarn",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_REFERANDEARN_CONFIGS",
                    payload: data.response,
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("getAllReferAndEarnConfig", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADD REFER AND EARN CONFIG
export const addReferAndEarnConfig = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "dev/api/v1/config/referAndEarn",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_REFERANDEARN_CONFIG",
                    payload: data.response,
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("getAllReferAndEarnConfig", err.response.data)
            alert(err.response.data.message)
        }
    }
}


//DELETE REFER AND EARN CONFIG
export const deleteReferAndEarnConfig = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + "dev/api/v1/config/referAndEarn/" + id,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_REFERANDEARN_CONFIG",
                    payload: id,
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("deleteReferAndEarnConfig", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//UPDATE CUSTOMER WALLET
//ADD REFER AND EARN CONFIG
export const updateCustomerWallet = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/customer/wallet",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_CUSTOMER_WALLET",
                    payload: data.response,
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("updateCustomerWallet", err.response.data)
            alert(err.response.data.message)
        }
    }
}