import axios from 'axios'
const url =  'https://servimate-admin.herokuapp.com/'
//const dev_url = "https://servimate-server-admin-dev.herokuapp.com/"
// const url = 'http://localhost:4000/'



const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}


export const addVoucher = (voucher,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "dev/api/v1/voucher",
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
                alert("Error Occured", data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("Error in a addVoucher", err.message)
        }
    }
}


export const getVouchers = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "dev/api/v1/vouchers",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_VOUCHERS",
                    payload: data.response
                })
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("Error in a getVouchers", err)
        }
    }
}

export const deleteVoucher = (id,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `dev/api/v1/voucher/${id}`,
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
                alert("Error Occured", data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("Error in a addVoucher", err.message)
        }
    }
}