const initialState = {
    allBookings:[],
    newBookings: [],
    currentBookings: [],
    bookingHistory: [],
    cancellationRequests: [],
    loader: false
}


const booking = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NEW_BOOKINGS":
            return {
                ...state,
                newBookings: action.payload,
            }
        case "SET_CURRENT_BOOKINGS":
            return {
                ...state,
                currentBookings: action.payload,
            }
        case "SET_BOOKING_HISTORY":
            return {
                ...state,
                bookingHistory: action.payload,
            }
        case "SET_CANCELLATION_REQUEST":
            return {
                ...state,
                cancellationRequests: action.payload,
            }
        // case "SET_APPROVED_CANCELLATION_REQUEST":
        //     return {
        //         ...state,
        //         cancellationRequests: state.cancellationRequests.map(d => d._id.toString() === action.payload._id.toString() ? action.payload : d)
        //     }
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state
    }
}

export default booking