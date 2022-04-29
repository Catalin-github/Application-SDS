import { KEEP_DATA, FETCH_DATA, LOG_OUT_USER_DATA } from './dataTypes';

const initialState = {
  user: '',
  fetchFinished: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case KEEP_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_DATA:
      return {
        ...state,
        fetchFinished: true,
      };
    case LOG_OUT_USER_DATA:
      return {
        fetchFinished: false,
        user: '',
      };
    default:
      return state;
  }
};

export default dataReducer;
