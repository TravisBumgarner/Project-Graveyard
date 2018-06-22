export const GET_MEASUREMENTS = 'GET_MEASUREMENTS';
export const GET_MEASUREMENTS_FAILURE = 'GET_MEASUREMENTS_FAILURE';
export const GET_MEASUREMENTS_SUCCESS = 'GET_MEASUREMENTS_SUCCESS';

export const getMeasurements = () => {
  return {
    type: 'GET_MEASUREMENTS',
    payload: {
      request:{
        url:'/measurements'
      }
    }
  }
};