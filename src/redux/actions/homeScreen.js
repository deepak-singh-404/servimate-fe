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
        type: "SET_BANNERS",
        payload: data
    }
}

export const setBottomSliders = (data) => {
    return {
        type: "SET_BOTTOM_SLIDERS",
        payload: data
    }
}

export const setTopPicks = (data) => {
    return {
        type: "SET_TOP_PICKS",
        payload: data
    }
}

export const setHomePageReviews = (data) => {
    return {
        type: "SET_HOME_PAGE_REVIEWS",
        payload: data
    }
}

//ADD BANNERS
export const addBanners = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/homeScreen/banner",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_BANNER",
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
            console.log("ADD BANNERS ", err.response.data)
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
                url: prod_url + "api/v1/homeScreen/banner",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBanners(data.response))
            } else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET BANNERS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE BANNER
export const deleteBanner = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/homeScreen/banner/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_BANNER",
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
            console.log("DELETE BANNER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADD BOTTOM SLIDER
export const addBottomSlider = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/homeScreen/bottomSlider",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_BOTTOM_SLIDER",
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
            console.log("ADD BOTTOM SLIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET BOTTOM SLIDERS
export const getBottomSliders = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/homeScreen/bottomSlider",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBottomSliders(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET BOTTOM SLIDERS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE BOTTOM SLIDER
export const deleteBottomSlider = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/homeScreen/bottomSlider/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_BOTTOM_SLIDER",
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
            console.log("DELETE BOTTOM SLIDER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADD TOP PICK
export const addTopPick = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/homeScreen/topPick",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_TOP_PICK",
                    payload: data.response
                })
                cb()
            }
            else {
                alert(data.messsage)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD TOP PICK ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET TOP PICKS
export const getTopPicks = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/homeScreen/topPick",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setTopPicks(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET TOP PICKS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE TOP PICK
export const deleteTopPick = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/homeScreen/topPick/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_TOP_PICK",
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
            console.log("DELETE TOP PICK ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//ADD HOME SCREEN REVIEW
export const addHomeScreenReview = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "api/v1/homeScreen/homePageReview",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "SET_HOME_PAGE_REVIEW",
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
            console.log("ADD HOME SCREEN REVIEW ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET HOME PAGE REVIEWS
export const getHomePageReviews = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "api/v1/homeScreen/homePageReview",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setHomePageReviews(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET HOME PAGE REVIEWS ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//DELETE HOME PAGE REVIEW
export const deleteHomePageReview = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `api/v1/homeScreen/homePageReview/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_HOME_PAGE_REVIEW",
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
            console.log("DELETE HOME PAGE REVIEW ", err.response.data)
            alert(err.response.data.message)
        }
    }
}