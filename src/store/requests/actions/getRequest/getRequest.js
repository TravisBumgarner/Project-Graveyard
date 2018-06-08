import axios from 'axios';

import requestNormalizers from '../../normalizers';

import { API_URL } from '../../../../constants';

export const getRequestStart = resource => ({
  type: `GET_${resource}_START`,
});

export const getRequestSuccess = (resource, data) => ({
  type: `GET_${resource}_SUCCESS`,
  data,
});

export const getRequestFailure = (resource, error) => ({
  type: `GET_${resource}_FAILURE`,
  error,
});

export const getRequest = (resource, params = {}) => {
  const resourceDisplayString = resource.replace(/\/.*/, '').toUpperCase();

  return (dispatch) => {
    dispatch(getRequestStart(resourceDisplayString));
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}${resource}`, params).then((response) => {
        const normalizedData = requestNormalizers.flattenJSON(response.data);
        const all = normalizedData.entities.results;
        const byId = normalizedData.result;

        dispatch(getRequestSuccess(resourceDisplayString, { all, byId }));
        resolve();
      }).catch((e) => {
        dispatch(getRequestFailure(resourceDisplayString, e));
        reject();
      });
    });
  };
};
