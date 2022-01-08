const initialState = {
    admin: {},
    isAuthenticated: false,
    loader: false
}



const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADMIN_DATA":
            return {
                ...state,
                admin: action.payload,
                isAuthenticated: true
            }
        case "DELETE_ADMIN_DATA":
            return {
                ...state,
                admin: action.payload,
                isAuthenticated: false
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

export default adminReducer