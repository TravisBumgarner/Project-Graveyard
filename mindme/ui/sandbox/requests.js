// import axios from 'axios';
//
// export const DELETE_MEASUREMENT_START = 'DELETE_MEASUREMENT_START';
// export const DELETE_MEASUREMENT_SUCCESS = 'DELETE_MEASUREMENT_SUCCESS';
// export const DELETE_MEASUREMENT_FAILURE = 'DELETE_MEASUREMENT_FAILURE';
//
// export const deleteMeasurementStart = () => ({
//   type: DELETE_MEASUREMENT_START,
// });
//
// export const deleteMeasurementSuccess = _id => ({
//   type: DELETE_MEASUREMENT_SUCCESS,
//   _id,
// });
//
// export const deleteMeasurementFailure = error => ({
//   type: DELETE_MEASUREMENT_FAILURE,
//   error,
// });
//
// export const deleteMeasurement = (id) => {
//   return (dispatch) => {
//     dispatch(deleteMeasurementStart());
//     return new Promise((resolve, reject) => {
//       axios.delete(`http://localhost:8000/measurements/${id}`).then((response) => {
//         const {
//           data: {_id},
//         } = response;
//         dispatch(deleteMeasurementSuccess(_id));
//         resolve();
//       }).catch(() => {
//         dispatch(deleteMeasurementFailure('There was an error, please try again later.'));
//         reject();
//       });
//     });
//   };
// };

// export const deleteMeasurementFailure = error => ({
//   type: DELETE_MEASUREMENT_FAILURE,
//   error,
// });
//

const makeActionTypeString = (resourceDetails) => {
  const {
    verb,
    noun,
    suffix,
  } = resourceDetails;

  return `${verb.toUpperCase() }_${ noun.toUpperCase() }_${ suffix.toUpperCase() }`;
};

const makeActionCreator = (type, data) => {
  const actionCreator = (data) => ({
    type,
    data
  });
  return actionCreator
};
// x = makeActionCreator({verb: 'get', noun: 'measurement', suffix: 'success'});
// console.log(x('foo'));

const makeActionCreators = (verb, noun) => {
  const suffixes = ["START", "SUCCESS", "FAILURE"];

  const actionCreators = suffixes.map(suffix => makeActionCreator(type, data));

  return actionCreators;
};

x = makeActionCreators('get', 'cats');
console.log(x[0]({a: 5}));