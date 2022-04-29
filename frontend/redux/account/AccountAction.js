/** @format */

import {
  ACCOUNT_FAILURE,
  ACCOUNT_SUCCESS,
  ACCOUNT_LOADING,
  ACCOUNT_ADDED,
} from './AccountActionsType';
import { getAllRoles } from '../role/RoleAction';
export const getAllEmployee = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/allEmployee`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res.sort((a, b) => (a.lastName < b.lastName ? 1 : -1));

        dispatch(accountSuccess({ data: res }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addEmployee = data => {
  return dispatch => {
    dispatch(accountRequest());
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success === false) {
          alert('The email is already used!');
        } else {
          dispatch(accountAdded(res));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateEmployee = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/update`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        dispatch(accountUpdated(res));
        dispatch(getAllRoles());
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteEmployee = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/delete`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success === true) {
          alert(res.message);
        } else {
          alert(res.message);
          window.location.reload();
        }
      });
  };
};

export const accountRequest = () => {
  return {
    type: ACCOUNT_LOADING,
  };
};

export const accountSuccess = data => {
  return {
    type: ACCOUNT_SUCCESS,
    payload: data,
  };
};

export const accountFailure = () => {
  return {
    type: ACCOUNT_FAILURE,
  };
};
export const accountAdded = data => {
  return {
    type: ACCOUNT_ADDED,
    payload: data,
  };
};
export const accountUpdated = data => {
  return {
    type: 'ACCOUNT_UPDATE',
    payload: data,
  };
};

export const accountRefresh = () => {
  return {
    type: 'ACCOUNT_REFRESH',
  };
};
