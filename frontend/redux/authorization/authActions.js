/** @format */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_SUCCESS,
  AUTH_REQUEST,
} from './authTypes';

export const authenticateUser = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/isAuthenticated`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === undefined) {
          throw new Error('You are not authenticated!');
        }
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailure());
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/logIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(loginSuccess(res));
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const logoutRequest = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/logOut`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success === true && res.message === "You've signed out successfully!") {
          window.location = '/login';
        } else {
          window.location = '/';
          alert('Momentan nu puteți întreprinde această acțiune');
        }
      });
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

export const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

export const authSuccess = data => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};
