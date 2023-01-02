import sessionActions from '../../actions';

const stats = (state = {}, action) => {
  switch (action.type) {
    case sessionActions.LOAD_SESSION_SUCCESS:
      return {
        ...action.data,
      };
    default:
      return state;
  }
};

export default stats;