import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'


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

export const setSlidersScreens = (data) => {
    return {
        type: "PARTNER_SET_SLIDER_SCREENS",
        payload: data
    }
}

//ADD BANNER
export const addBanners = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/serviceProvider/banner",
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
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD BANNER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET BANNERS
export const getBanners = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceProvider/banner",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBanners(data.response))
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

//PARTNER DELETE BANNER
export const partnerDeleteBanner = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/serviceProvider/banner/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_DELETE_BANNER",
                    payload: data.response
                })
                cb()
            } else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("PARTNER DELETE BANNER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADD SLIDER SCREEN
export const addSliderScreen = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/serviceProvider/screen/slider",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_SET_SLIDER_SCREEN",
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
            console.log("ADD SLIDER SCREEN", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET SLIDER SCREENS
export const getSliderScreens = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/serviceProvider/screen/slider",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setSlidersScreens(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET SLIDER SCREEN", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//PARTNER DELETE SLIDER SCREEN
export const partnerDeleteSliderScreen = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/serviceProvider/screen/slider/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_DELETE_SLIDER_SCREEN",
                    payload: data.response
                })
                cb()
            } else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("PARTNER_DELETE_SLIDER_SCREEN", err.response.data)
            alert(err.response.data.message)
        }
    }
}
