import skillsActions from '../../actions';

const all = (state = {}, action) => {
  switch (action.type) {
    case skillsActions.GET_SKILLS_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default all;
