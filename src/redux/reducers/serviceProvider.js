const initialState = {
    serviceProvider: {},
    serviceProviders: [],
    loader: false,
    success: false,
    registrationRequest:[]
}


const serviceProvider = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SERVICEPROVIDER":
            return {
                ...state,
                serviceProvider: action.payload,
                serviceProviders: [action.payload, ...state.serviceProviders],
            }
        case "SET_SERVICEPROVIDERS":
            return {
                ...state,
                serviceProviders: action.payload,
            }
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "DELETE_SERVICE_PROVIDER":
            return {
                ...state,
                serviceProviders: state.serviceProviders.filter(obj => {
                    return obj._id !== action.payload
                }),
            }
        case "SET_SUCCESS":
            return {
                ...state,
                success: action.payload
            }
        case "SET_REGISTRATION_REQUEST":
            return {
                ...state,
                registrationRequest: action.payload
            }
        case "REVIEW_REGISTRATION_REQUEST":
            return {
                ...state,
                registrationRequest: state.registrationRequest.map(d => d._id == action.payload._id ? action.payload : d),
            };
        case "UPDATE_SERVICE_PROVIDER":
            return {
                ...state,
                serviceProviders: state.serviceProviders.map(d => d._id == action.payload._id ? action.payload : d),
            };
        default:
            return state
    }
}

export default serviceProvider