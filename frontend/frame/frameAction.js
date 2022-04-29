/** @format */

export const getTableFrame = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/frame/getTableFrame`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(frameSuccess(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editTableFrame = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/frame/editTableFrame`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(frameEdit(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const frameRequest = () => {
  return {
    type: 'FRAME_LOADING',
  };
};

export const frameSuccess = data => {
  return {
    type: 'FRAME_SUCCESS',
    payload: data,
  };
};
export const frameEdit = data => {
  return {
    type: 'FRAME_EDIT',
    payload: data,
  };
};
