import axios from 'axios';

export const CREATE_MEASUREMENT_START = 'CREATE_MEASUREMENT_START';
export const CREATE_MEASUREMENT_SUCCESS = 'CREATE_MEASUREMENT_SUCCESS';
export const CREATE_MEASUREMENT_FAILURE = 'CREATE_MEASUREMENT_FAILURE';

export const createMeasurementStart = () => ({
  type: CREATE_MEASUREMENT_START,
});

export const createMeasurementSuccess = data => ({
  type: CREATE_MEASUREMENT_SUCCESS,
  data,
});

export const createMeasurementFailure = error => ({
  type: CREATE_MEASUREMENT_FAILURE,
  error,
});

export const createMeasurement = (data) => {
  return (dispatch) => {
    dispatch(createMeasurementStart());
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:8000/measurements`, data).then((response) => {
        const {
          data,
        } = response;
        dispatch(createMeasurementSuccess(data));
        resolve();
      }).catch(() => {
        dispatch(createMeasurementFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};