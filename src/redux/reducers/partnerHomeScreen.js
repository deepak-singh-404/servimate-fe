const initialState = {
    banners: [],
    loader: false,
}

const partnerHomeScreen = (state = initialState, action) => {
    switch (action.type) {
        case "PARTNER_SET_BANNER":
            return {
                ...state,
                banners: [...state.banners, action.payload],
            }
        case "PARTNER_SET_BANNERS":
            return {
                ...state,
                banners: action.payload,
            }
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "PARTNER_DELETE_BANNER":
            return {
                ...state,
                banners: state.banners.filter(obj => {
                    return obj._id !== action.payload._id
                }),
            }
        default:
            return state
    }
}

export default partnerHomeScreen