const initialState = {
    voucher: {},
    vouchers: [],
    loader: false,
    success: false
}


const voucher = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VOUCHER":
            return {
                ...state,
                voucher: action.payload,
                vouchers: [action.payload, ...state.vouchers],
            }
        case "SET_VOUCHERS":
            return {
                ...state,
                vouchers: action.payload,
            }
        case "DELETE_VOUCHER":
            return {
                ...state,
                vouchers: state.vouchers.filter(obj => {
                    return obj._id !== action.payload
                }),
            };
        case "UPDATE_VOUCHER":
            return {
                ...state,
                vouchers: state.vouchers.map(d => d._id == action.payload._id ? action.payload : d),
            };
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_SUCCESS":
            return {
                ...state,
                success: action.payload
            }
        default:
            return state
    }
}

export default voucher