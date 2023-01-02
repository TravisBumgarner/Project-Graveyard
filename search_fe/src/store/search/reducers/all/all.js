import searchActions from '../../actions';

const all = (state = [], action) => {
  switch (action.type) {
    case searchActions.PERFORM_NEW_SEARCH_SUCCESS:
      return [
        ...action.data.hits.hits,
      ];
    case searchActions.GET_MORE_RESULTS_SUCCESS:
      return [
        ...action.data.hits.hits,
      ];
    default:
      return state;
  }
};

export default all;
