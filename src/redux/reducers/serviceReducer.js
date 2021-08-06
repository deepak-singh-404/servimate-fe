const initialState = {
  service: {},
  services: [],
  serviceCategory: {},
  singleServiceCategory: {},
  serviceCategories: [],
  serviceSubCategory: {},
  serviceSubCategories: [],
  loader: false,
  success: false,
  allServiceSubCategory: []
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
        services: [...state.services, action.payload,],
      };
    case "SET_SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map(d => d._id == action.payload._id ? action.payload : d),
      };
    case "DELETE_SERVICE_CATEGORY":
      return {
        ...state,
        serviceCategories: state.serviceCategories.filter(obj => {
          return obj._id !== action.payload._id
        }),
      };
    case "DELETE_SERVICE_SUB_CATEGORY":
      return {
        ...state,
        serviceSubCategories: state.serviceSubCategories.filter(obj => {
          return obj._id !== action.payload._id
        }),
      };
    case "DELETE_SERVICE":
      return {
        ...state,
        services: state.services.filter(obj => {
          return obj._id !== action.payload._id
        }),
      }
    case "SET_SINGLE_SERVICE-CATEGORY":
      return {
        ...state,
        singleServiceCategory: action.payload
      }
    case "SET_SERVICE_CATEGORY":
      return {
        ...state,
        serviceCategory: action.payload,
        serviceCategories: [...state.serviceCategories, action.payload],
      };
    case "UPDATE_SERVICE_CATEGORY":
      return {
        ...state,
        serviceCategories: state.serviceCategories.map(d => d._id == action.payload._id ? action.payload : d),
      };
    case "SET_SERVICE_SUB_CATEGORY":
      return {
        ...state,
        serviceSubCategory: action.payload,
        serviceSubCategories: [...state.serviceSubCategories, action.payload],
      };
    case "UPDATE_SERVICE_SUB_CATEGORY":
      return {
        ...state,
        serviceSubCategories: state.serviceSubCategories.map(d => d._id == action.payload._id ? action.payload : d),
      };
    case "SET_SERVICE_CATEGORIES":
      return {
        ...state,
        serviceCategories: action.payload
      }
    case "SET_SERVICE_SUB_CATEGORIES":
      return {
        ...state,
        serviceSubCategories: action.payload,
      };
    case "SET_ALL_SERVICE_SUB_CATEGORY":
      return {
        ...state,
        allServiceSubCategory: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default serviceReducer;
