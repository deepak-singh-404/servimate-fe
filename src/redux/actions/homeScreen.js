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

export const setTopPicks = (data) =>{
    return {
        type: "SET_TOP_PICKS",
        payload: data
    }
}


export const addBanners = (_data,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/homeScreen/banner",
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
                url: url + "api/v1/homeScreen/banner",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBanners(data.response))
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getBanners", err.message)
        }
    }
}



export const deleteBanner = (id,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/homeScreen/banner/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type:"DELETE_BANNER",
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

export const addBottomSlider = (_data,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/homeScreen/bottomSlider",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a addBottomSlider", err.message)
        }
    }
}

export const getBottomSliders = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "api/v1/homeScreen/bottomSlider",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBottomSliders(data.response))
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getBottomSliders", err.message)
        }
    }
}

export const deleteBottomSlider = (id,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/homeScreen/bottomSlider/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type:"DELETE_BOTTOM_SLIDER",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteBottomSlider", err.message)
        }
    }
}

export const addTopPick = (_data,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: url + "api/v1/homeScreen/topPick",
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
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a addTopPicks", err.message)
        }
    }
}


export const getTopPicks = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: url + "api/v1/homeScreen/topPick",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setTopPicks(data.response))
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a getTopPicks", err.message)
        }
    }
}



export const deleteTopPick = (id,cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: url + `api/v1/homeScreen/topPick/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type:"DELETE_TOP_PICK",
                    payload: data.response
                })
                cb()
            }
        }
        catch (err) {
            dispatch(loader(false))
            alert("Some error  occured")
            console.log("Error in a deleteTopPick", err.message)
        }
    }
}