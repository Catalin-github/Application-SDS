/** @format */

export const getClientDetail = clientId => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/getClientDetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientId),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res.sort((a, b) => (a['title'] < b['title'] ? 1 : -1));
        dispatch(profileSuccess(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateAllDocumentByProjectId = (files, projectId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
  var yyyy = dateTime.getFullYear();

  dateTime = mm + '/' + dd + '/' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/client/addOfferDocumentData?projectId=${projectId}&date=${dateTime}&employee=${employee}`,
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
        dispatch(profileOfferAdd({ res: res, projectId: projectId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateInvoiceFileByProjectId = (files, projectId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = dateTime.getFullYear();

  dateTime = mm + '/' + dd + '/' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/client/addOrderInvoiceData?projectId=${projectId}&date=${dateTime}&employee=${employee}`,
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
        dispatch(profileInvoiceAdd({ res: res, projectId: projectId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const updateGuaranteeFileByProjectId = (files, projectId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
  var yyyy = dateTime.getFullYear();

  dateTime = mm + '/' + dd + '/' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/client/addOrderGuaranteeData?projectId=${projectId}&date=${dateTime}&employee=${employee}`,
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
        dispatch(profileGuaranteeAdd({ res: res, projectId: projectId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateAccordFileByProjectId = (files, projectId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
  var yyyy = dateTime.getFullYear();

  dateTime = mm + '/' + dd + '/' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/client/addOrderAccordData?projectId=${projectId}&date=${dateTime}&employee=${employee}`,
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
        dispatch(profileAccordAdd({ res: res, projectId: projectId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateIdentityFileByProjectId = (files, projectId, employee) => {
  var dateTime = new Date();
  var dd = String(dateTime.getDate()).padStart(2, '0');
  var mm = String(dateTime.getMonth() + 1).padStart(2, '0');
  var yyyy = dateTime.getFullYear();

  dateTime = mm + '/' + dd + '/' + yyyy;
  return dispatch => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/client/addOrderIdentityData?projectId=${projectId}&date=${dateTime}&employee=${employee}`,
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
        dispatch(profileIdentityAdd({ res: res, projectId: projectId }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const updateClientData = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(clientUpdateData([res]));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addJournalReply = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/client/addReply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(journalAddData(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const profileRequest = () => {
  return {
    type: 'PROFILE_LOADING',
  };
};
export const profileSuccess = data => {
  return {
    type: 'PROFILE_SUCCESS',
    payload: data,
  };
};

export const profileOfferAdd = data => {
  return {
    type: 'PROFILE_OFFER_ADD',
    payload: data,
  };
};

export const profileInvoiceAdd = data => {
  return {
    type: 'PROFILE_INVOICE_ADD',
    payload: data,
  };
};
export const profileGuaranteeAdd = data => {
  return {
    type: 'PROFILE_GUARANTEE_ADD',
    payload: data,
  };
};
export const profileAccordAdd = data => {
  return {
    type: 'PROFILE_ACCORD_ADD',
    payload: data,
  };
};
export const profileIdentityAdd = data => {
  return {
    type: 'PROFILE_IDENTITY_ADD',
    payload: data,
  };
};
export const clientUpdateData = data => {
  return {
    type: 'CLIENT_UPDATE_DATA',
    payload: data,
  };
};

export const journalAddData = data => {
  return {
    type: 'JOURNAL_ADD_DATA',
    payload: data,
  };
};
export const updateProfile = () => {
  return {
    type: 'UPDATE_PROFILE',
  };
};
