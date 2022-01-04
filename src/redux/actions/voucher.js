import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'

const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

//ADD VOUCHER
export const addVoucher = (voucher, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "dev/api/v1/voucher",
                data: voucher
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_VOUCHER",
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
            console.log("ADD VOUCHER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET VOUCHERS
export const getVouchers = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "dev/api/v1/vouchers",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_VOUCHERS",
                    payload: data.response
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET VOUCHERS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE VOUCHER
export const deleteVoucher = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `dev/api/v1/voucher/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_VOUCHER",
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
            console.log("DELETE VOUCHER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//REDEEM VOUCHER
export const redeemVoucher = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + `dev/api/v1/voucher/redeem/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_VOUCHER",
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
            console.log("REDEEM VOUCHER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//UPDATE VOUCHER
export const updateVoucher = (id, _data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Put",
                url: prod_url + `dev/api/v1/voucher/${id}`,
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "UPDATE_VOUCHER",
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
            console.log("UPDATE VOUCHER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}