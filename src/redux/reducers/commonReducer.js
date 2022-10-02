const initialState = {
    abandonedCart: [],
    customers: [],
    loader: false,
    referAndEarnConfigs: []
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ABANDONED_CART":
            return {
                ...state,
                abandonedCart: action.payload,
            }
        case "UPDATE_ABANDONED_CART":
            let temp = state.abandonedCart
            temp[action.index] = action.payload
            return {
                ...state,
                abandonedCart: [...state.abandonedCart, ...temp],
            }
        case "SET_CUSTOMERS":
            return {
                ...state,
                customers: action.payload,
            }
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_REFERANDEARN_CONFIGS":
            return {
                ...state,
                referAndEarnConfigs: action.payload
            }
        case "SET_REFERANDEARN_CONFIG":
            return {
                ...state,
                referAndEarnConfigs: [...state.referAndEarnConfigs, action.payload]
            }
        case "DELETE_REFERANDEARN_CONFIG":
            return {
                ...state,
                referAndEarnConfigs: state.referAndEarnConfigs.filter(obj => {
                    return obj._id !== action.payload
                }),
            }
        default:
            return state
    }
}

export default commonReducer