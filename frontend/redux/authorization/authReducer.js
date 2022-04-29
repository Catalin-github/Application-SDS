/** @format */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_SUCCESS,
  AUTH_REQUEST,
} from './authTypes';

const initialState = {
  loading: true,
  loaded: false,
  isAuth: false,
  userData: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        isAuth: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuth: true,
        userData: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuth: false,
      };
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        isAuth: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuth: true,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
