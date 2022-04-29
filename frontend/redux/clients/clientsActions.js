import { CLIENTS_FAILURE, CLIENTS_SUCCESS, CLIENTS_LOADING, CLIENTS_ADDED } from './clientsTypes';

export const getAllClients = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/getAll`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res.sort((a, b) => (a['message'] > b['message'] ? 1 : -1));
        dispatch(clientsSuccess(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addClients = data => {
  return dispatch => {
    dispatch(clientsRequest());
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/add`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(clientsAdded(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateClients = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/update`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };
};

export const clientsRequest = () => {
  return {
    type: CLIENTS_LOADING,
  };
};

export const clientsSuccess = data => {
  return {
    type: CLIENTS_SUCCESS,
    payload: data,
  };
};

export const clientsFailure = () => {
  return {
    type: CLIENTS_FAILURE,
  };
};
export const clientsAdded = data => {
  return {
    type: CLIENTS_ADDED,
    payload: data,
  };
};
