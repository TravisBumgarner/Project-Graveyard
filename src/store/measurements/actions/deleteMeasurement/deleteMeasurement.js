import axios from 'axios';

export const DELETE_MEASUREMENT_START = 'DELETE_MEASUREMENT_START';
export const DELETE_MEASUREMENT_SUCCESS = 'DELETE_MEASUREMENT_SUCCESS';
export const DELETE_MEASUREMENT_FAILURE = 'DELETE_MEASUREMENT_FAILURE';

export const deleteMeasurementStart = () => ({
  type: DELETE_MEASUREMENT_START,
});

export const deleteMeasurementSuccess = _id => ({
  type: DELETE_MEASUREMENT_SUCCESS,
  _id,
});

export const deleteMeasurementFailure = error => ({
  type: DELETE_MEASUREMENT_FAILURE,
  error,
});

export const deleteMeasurement = (id) => {
  return (dispatch) => {
    dispatch(deleteMeasurementStart());
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8000/measurements/${id}`).then((response) => {
        const {
          data: {_id},
        } = response;
        dispatch(deleteMeasurementSuccess(_id));
        resolve();
      }).catch(() => {
        dispatch(deleteMeasurementFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};