/** @format */
import {
  MEASURE_SUCCESS,
  MEASURE_LOADING,
  MEASURE_FAILURE,
  MEASURE_ADD,
  MEASURE_DELETE,
} from './MeasureActionType';
export const getAllMeasureTable = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/measure/getTableMeasure`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res.sort((a, b) => (a['status'] < b['status'] ? 1 : -1));
        dispatch(measureSuccess(res));
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addMeasureTable = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/measure/addTableMeasureData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(measureAdd(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addDiagramsForMeasureId = (files, measureId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
  var yyyy = dateTime.getFullYear();
  dateTime = dd + '.' + mm + '.' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/diagram/addDiagrams?measureId=${measureId}&date=${dateTime}&employee=${employee}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(files),
      },
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(diagramAdd({ res: res, measureId: measureId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const measureRequest = () => {
  return {
    type: MEASURE_LOADING,
  };
};
export const measureSuccess = data => {
  return {
    type: MEASURE_SUCCESS,
    payload: data,
  };
};

export const measureFailure = () => {
  return {
    type: MEASURE_FAILURE,
  };
};

export const measureAdd = data => {
  return {
    type: MEASURE_ADD,
    payload: data,
  };
};

export const measureDelete = data => {
  return {
    type: MEASURE_DELETE,
    payload: data,
  };
};

export const diagramAdd = data => {
  return {
    type: 'DIAGRAM_ADDED',
    payload: data,
  };
};
