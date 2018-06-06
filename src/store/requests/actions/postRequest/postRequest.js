import axios from 'axios';

import { API_URL } from '../../../../constants';

export const postRequestStart = resource => ({
  type: `POST_${resource}_START`,
});

export const postRequestSuccess = (resource, data) => ({
  type: `POST_${resource}_SUCCESS`,
  data,
});

export const postRequestFailure = (resource, error) => ({
  type: `POST_${resource}_FAILURE`,
  error,
});

export const postRequest = (resource, data = {}) => {
  const resourceDisplayString = resource.replace(/\/.*/, '').toUpperCase();

  return (dispatch) => {
    dispatch(postRequestStart(resourceDisplayString));
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}${resource}`, data).then((response) => {
        dispatch(postRequestSuccess(resourceDisplayString, response.data));
        resolve();
      }).catch((e) => {
        dispatch(postRequestFailure(resourceDisplayString, e));
        reject();
      });
    });
  };
};
