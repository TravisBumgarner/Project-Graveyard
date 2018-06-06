import axios from 'axios';

import { API_URL } from '../../../../constants';

export const putRequestStart = resource => ({
  type: `PUT_${resource}_START`,
});

export const putRequestSuccess = (resource, data) => ({
  type: `PUT_${resource}_SUCCESS`,
  data,
});

export const putRequestFailure = (resource, error) => ({
  type: `PUT_${resource}_FAILURE`,
  error,
});

export const putRequest = (resource, data = {}) => {
  const resourceDisplayString = resource.replace(/\/.*/, '').toUpperCase();

  return (dispatch) => {
    dispatch(putRequestStart(resourceDisplayString));
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}${resource}`, data).then((response) => {
        dispatch(putRequestSuccess(resourceDisplayString, response.data));
        resolve();
      }).catch((e) => {
        dispatch(putRequestFailure(resourceDisplayString, e));
        reject();
      });
    });
  };
};
