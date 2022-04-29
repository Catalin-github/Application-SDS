import { CLIENTS_FAILURE, CLIENTS_LOADING, CLIENTS_SUCCESS, CLIENTS_ADDED } from './clientsTypes';

const initialState = {
  loading: true,
  loaded: false,
  clientsData: [],
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENTS_LOADING:
      return {
        ...state,
        loading: true,
        leaded: false,
      };
    case CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        clientsData: action.payload,
      };
    case CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case CLIENTS_ADDED: {
      state.clientsData.data.push(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    default:
      return state;
  }
};

export default clientsReducer;
