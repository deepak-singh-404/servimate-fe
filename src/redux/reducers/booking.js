const initialState = {
    newBookings: [],
    currentBookings: [],
    bookingHistory: [],
    requestedForCancellation: [],
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
        case "SET_REQUESTED_FOR_CANCELLATION":
            return {
                ...state,
                requestedForCancellation: action.payload,
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

export default booking