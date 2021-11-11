const initialState = {
    city: {},
    cities: [],
    loader: false,
    success: false
}






const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CITY":
            return {
                ...state,
                city: action.payload,
                cities: [action.payload, ...state.cities],
            }
        case "SET_CITIES":
            return {
                ...state,
                cities: action.payload,
            }
        case "DELETE_CITY":
            return {
                ...state,
                cities: state.cities.filter(obj => {
                    return obj._id !== action.payload
                }),
            }
        case "UPDATE_CITY":
            return {
                ...state,
                cities: state.cities.map(d => d._id == action.payload._id ? action.payload : d),
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

export default cityReducer