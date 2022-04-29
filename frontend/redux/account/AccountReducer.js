/** @format */

import {
  ACCOUNT_FAILURE,
  ACCOUNT_LOADING,
  ACCOUNT_SUCCESS,
  ACCOUNT_ADDED,
} from './AccountActionsType';

const initialState = {
  loading: true,
  loaded: false,
  update: false,
  accountData: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_LOADING:
      return {
        ...state,
        loading: true,
        leaded: false,
      };
    case ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accountData: action.payload,
      };
    case ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case ACCOUNT_ADDED: {
      state.accountData.data.push(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }

    case 'ACCOUNT_UPDATE': {
      var index = state.accountData.data.findIndex(x => x.id === action.payload.id);
      state.accountData.data.splice(index, 1, action.payload);
      for (let i = 0; i < state.accountData.data.length; i++) {
        if (state.accountData.data[i].role === action.payload.role) {
          state.accountData.data[i].authority.splice(0, Infinity, ...action.payload.authority);
        }
      }
      return {
        ...state,
        loading: false,
        update: !state.update,
      };
    }
    case 'ACCOUNT_REFRESH':
      return {
        ...state,
        update: !state.update,
      };
    default:
      return state;
  }
};

export default accountReducer;
