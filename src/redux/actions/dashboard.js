import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'

const loader = (data) => {
    return {
        type: "SET_DASHBOARD_LOADER",
        payload: data
    }
}

export const getBookings = (param, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + 'api/v1/admin/dashboard/report?field=' + param,
            })
            dispatch(loader(false))
            if (data.success) {
                cb(data.response)
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            console.log("ERROR==>", param.toUpperCase(), err)
        }
    }
}