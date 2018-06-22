import peopleActions from '../../actions';

const all = (state = [], action) => {
  switch (action.type) {
    case peopleActions.GET_SEARCH_SUCCESS:
      return [
        ...state,
        ...action.data.hits.hits,
      ];
    default:
      return state;
  }
};

export default all;
