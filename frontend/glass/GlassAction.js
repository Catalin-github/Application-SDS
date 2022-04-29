/** @format */

export const getTableGlass = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/glass/getTableGlass`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res.sort((a, b) => (a['status'] > b['status'] ? 1 : -1));
        dispatch(glassSuccess(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editTableGlass = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/glass/editTableGlass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(glassEdit(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const glassRequest = () => {
  return {
    type: 'GLASS_LOADING',
  };
};

export const glassSuccess = data => {
  return {
    type: 'GLASS_SUCCESS',
    payload: data,
  };
};
export const glassEdit = data => {
  return {
    type: 'GLASS_EDIT',
    payload: data,
  };
};
