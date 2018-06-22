import measurementActions from '../../actions';

const all = (state = [], action) => {
  switch (action.type) {
    case measurementActions.GET_MEASUREMENTS_SUCCESS:
      return [
        ...state,
        ...action.payload.data,
      ];
    case measurementActions.CREATE_MEASUREMENT_SUCCESS:
      return [
        ...state,
        action.data,
      ];
    case measurementActions.EDIT_MEASUREMENT_SUCCESS:
      return [
        ...state.filter(s => s._id !== action.data._id),
        action.data,
      ];
    case measurementActions.DELETE_MEASUREMENT_SUCCESS:
      return [
        ...state.filter(s => s._id !== action._id)
      ];
    default:
      return state;
  }
};

export default all;
