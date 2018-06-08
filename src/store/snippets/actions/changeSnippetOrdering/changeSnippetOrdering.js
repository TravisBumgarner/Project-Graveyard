export const CHANGE_SNIPPET_ORDERING_SUCCESS = 'CHANGE_SNIPPET_ORDERING_SUCCESS';

export const changeSnippetOrderingSuccess = sortedArray => ({
  type: CHANGE_SNIPPET_ORDERING_SUCCESS,
  sortedArray,
});

export const changeSnippetOrdering = (sortedArray) => {
  return (dispatch) => {
    dispatch(changeSnippetOrderingSuccess(sortedArray));
  };
};
