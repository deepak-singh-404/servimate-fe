import axios from 'axios'
const url = 'https://servimate-admin.herokuapp.com/'
const local_url = 'http://localhost:4000/'


const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

export const setBanners = (data) => {
    return {
        type: "PARTNER_SET_BANNERS",
        payload: data
    }
}

export const addBanners = (_data,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "partner/api/v1/homeScreen/banner",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_SET_BANNER",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a addBanners", err.message)
        }
    }
}

export const getBanners = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "partner/api/v1/homeScreen/banner",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBanners(data.response))
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert(JSON.stringify(err.message))
            console.log("Error in a getBanners", err.message)
        }
    }
}



export const partnerDeleteBanner = (id,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `partner/api/v1/homeScreen/banner/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type:"PARTNER_DELETE_BANNER",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteBanner", err.message)
        }
    }
}
