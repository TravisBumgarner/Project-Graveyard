import searchActions from '../../actions';

import { DEFAULT_PAGINATION } from "../../../../constants";

const DEFAULT_STATE = {
  currentPage: 0,
  totalPages: 0,
  query: '',
  wasSearchPerformed: false,

};

const meta = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case searchActions.PERFORM_NEW_SEARCH_START:
      return {
        ...state,
        query: action.query,
      };
    case searchActions.PERFORM_NEW_SEARCH_SUCCESS:
      return {
        ...state,
        currentPage: 0,
        totalPages: Math.ceil(action.data.hits.total / DEFAULT_PAGINATION),
        wasSearchPerformed: true,
      };
    case searchActions.GET_MORE_RESULTS_SUCCESS:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
};

export default meta;
