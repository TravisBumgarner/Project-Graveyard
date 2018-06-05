import measurementActions from '../../actions';

const defaultState = {
  isLoading: true,
  doMeasurementsExist: false,
};

const all = (state = defaultState, action) => {
  switch (action.type) {
    case measurementActions.GET_MEASUREMENTS:
      return {
        ...state,
        isLoading: true,
      };

    case measurementActions.GET_MEASUREMENTS_SUCCESS:
      return {
        isLoading: false,
        doMeasurementsExist: true,
      };

    case measurementActions.GET_MEASUREMENTS_FAILURE:
      return {
        isLoading: false,
        doMeasurementsExist: false,
      };

    default:
      return state;
  }
};

export default all;
