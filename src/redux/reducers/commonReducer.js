const initialState = {
    abandonedCart: [],
    customers: [],
    loader: false
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ABANDONED_CART":
            return {
                ...state,
                abandonedCart: action.payload,
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
        default:
            return state
    }
}

export default commonReducer