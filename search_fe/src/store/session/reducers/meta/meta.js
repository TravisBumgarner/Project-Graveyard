import sessionActions from '../../actions';

const defaultState = {
  loading: false,
  loaded: false,
};

const meta = (state = defaultState, action) => {
  switch (action.type) {
    case sessionActions.LOAD_SESSION_START:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case sessionActions.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case sessionActions.LOAD_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
};

export default meta;