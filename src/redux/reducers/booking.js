const initialState = {
    allBookings: [],
    newBookings: [],
    currentBookings: [],
    bookingHistory: [],
    cancellationRequests: [],
    outOfReachBookings: [],
    loader: false,
    manuallyAddedJobs: []
}

const booking = (state = initialState, action) => {
    switch (action.type) {
        case "MANUALLY_ADDED_JOBS":
            return {
                ...state,
                manuallyAddedJobs: action.payload
            }
        case "ADMIN_ADD_JOB_MANUALLY":
            return {
                ...state,
                manuallyAddedJobs: [action.payload, ...state.manuallyAddedJobs]
            }
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
        case "SET_OUT_OF_REACH_BOOKINGS":
            return {
                ...state,
                outOfReachBookings: action.payload,
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