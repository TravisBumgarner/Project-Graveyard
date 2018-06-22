import axios from 'axios';

export const EDIT_MEASUREMENT_START = 'EDIT_MEASUREMENT_START';
export const EDIT_MEASUREMENT_SUCCESS = 'EDIT_MEASUREMENT_SUCCESS';
export const EDIT_MEASUREMENT_FAILURE = 'EDIT_MEASUREMENT_FAILURE';

export const editMeasurementStart = () => ({
  type: EDIT_MEASUREMENT_START,
});

export const editMeasurementSuccess = data => ({
  type: EDIT_MEASUREMENT_SUCCESS,
  data,
});

export const editMeasurementFailure = error => ({
  type: EDIT_MEASUREMENT_FAILURE,
  error,
});

export const editMeasurement = (data) => {
  return (dispatch) => {
    dispatch(editMeasurementStart());
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8000/measurements/${data._id}`, data).then((response) => {
        const {
          data,
        } = response;
        dispatch(editMeasurementSuccess(data));
        resolve();
      }).catch(() => {
        dispatch(editMeasurementFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};