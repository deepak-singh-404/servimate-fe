const initialState = {
    abandonedCart: [],
    customers: [],
    loader: false,
    referAndEarnConfigs: [],
    utilityContents: [],
    customerQueries: []
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
        case "SET_REFERANDEARN_CONFIGS":
            return {
                ...state,
                referAndEarnConfigs: action.payload
            }
        case "SET_REFERANDEARN_CONFIG":
            return {
                ...state,
                referAndEarnConfigs: [action.payload, ...state.referAndEarnConfigs]
            }
        case "DELETE_REFERANDEARN_CONFIG":
            return {
                ...state,
                referAndEarnConfigs: state.referAndEarnConfigs.filter(obj => {
                    return obj._id !== action.payload
                }),
            }
        case "UPDATE_CUSTOMER_WALLET":
            return {
                ...state,
                customers: state.customers.map(d => d._id == action.payload._id ? action.payload : d)
            };
        case "SET_UTILITY_CONTENT":
            return {
                ...state,
                utilityContents: [action.payload, ...state.utilityContents]
            }
        case "SET_UTILITY_CONTENTS":
            return {
                ...state,
                utilityContents: action.payload
            }
        case "UPDATE_UTILITY_CONTENT":
            return {
                ...state,
                utilityContents: state.utilityContents.map(d => d._id == action.payload._id ? action.payload : d)
            }
        case "DELETE_UTILITY_CONTENT":
            return {
                ...state,
                utilityContents: state.utilityContents.filter(obj => {
                    return obj._id !== action.payload._id
                })
            }
        case "SET_CUSTOMER_QUERIES":
            return {
                ...state,
                customerQueries: action.payload
            }
        default:
            return state
    }
}

export default commonReducer