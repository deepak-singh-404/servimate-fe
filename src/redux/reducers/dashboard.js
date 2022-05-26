const initialState = {
    loader: false
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DASHBOARD_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state
    }
}

export default dashboardReducer