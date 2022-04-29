import { KEEP_DATA, FETCH_DATA, LOG_OUT_USER_DATA } from './dataTypes';

export const keepData = data => {
  return {
    type: KEEP_DATA,
    payload: data,
  };
};

export const fetch_data = () => {
  return {
    type: FETCH_DATA,
  };
};

export const log_out_userData = () => {
  return {
    type: LOG_OUT_USER_DATA,
  };
};
