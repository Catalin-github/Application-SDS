/** @format */

import {
  MEASURE_SUCCESS,
  MEASURE_LOADING,
  MEASURE_FAILURE,
  MEASURE_ADD,
  MEASURE_DELETE,
} from './MeasureActionType';

const initialState = {
  loading: true,
  loaded: false,
  update: false,
  measureData: [],
};

const measureReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEASURE_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case MEASURE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        measureData: action.payload,
      };
    case MEASURE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case MEASURE_ADD: {
      state.measureData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }
    case MEASURE_DELETE: {
      const newState = state.measureData.filter(value => value.projectId !== action.payload);
      state.measureData = newState;
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }

    case 'DIAGRAM_ADDED': {
      for (let i = 0; i < state.measureData.length; i++) {
        if (state.measureData[i].measureId === action.payload.measureId) {
          var dateTime = new Date();
          var dd = String(dateTime.getDate()).padStart(2, '0');
          var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
          var yyyy = dateTime.getFullYear();
          dateTime = dd + '.' + mm + '.' + yyyy;
          state.measureData[i].date = dateTime;

          state.measureData[i].diagrams.splice(0, Infinity, ...action.payload.res);
        }
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }
    default:
      return state;
  }
};

export default measureReducer;
