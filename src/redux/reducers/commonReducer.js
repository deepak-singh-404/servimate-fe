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
        default:
            return state
    }
}

export default commonReducer