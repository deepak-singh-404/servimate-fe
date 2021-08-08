const initialState = {
    banners: [],
    loader: false,
    bottomSliders: []
}


const homeScreen = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BANNER":
            return {
                ...state,
                banners: [...state.banners, action.payload],
            }
        case "SET_BANNERS":
            return {
                ...state,
                banners: action.payload,
            }
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "DELETE_BANNER":
            return {
                ...state,
                banners: state.banners.filter(obj => {
                    return obj._id !== action.payload._id
                }),
            }
        case "SET_BOTTOM_SLIDER":
            return {
                ...state,
                bottomSliders: [...state.bottomSliders, action.payload],
            }
        case "SET_BOTTOM_SLIDERS":
            return {
                ...state,
                bottomSliders: action.payload,
            }
        case "DELETE_BOTTOM_SLIDER":
            return {
                ...state,
                bottomSliders: state.bottomSliders.filter(obj => {
                    return obj._id !== action.payload._id
                }),
            }
        default:
            return state
    }
}

export default homeScreen