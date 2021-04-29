import {LOADING, SET_USER_LIST} from '../types';

export const setLoaderStatus = status => {
  return dispatch => {
    dispatch({type: LOADING, payload: status});
  };
};

export const setUserList = data => {
  return dispatch => {
    dispatch({type: SET_USER_LIST, payload: data});
  };
};
