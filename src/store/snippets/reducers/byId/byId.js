const byId = (state = [], action) => {
  switch (action.type) {
    case 'GET_SNIPPETS_SUCCESS':
      return [
        ...state,
        ...action.data.byId,
      ];
    case 'POST_SNIPPETS_SUCCESS':
      return [
        ...state,
        ...action.data.id,
      ];
    case 'CHANGE_SNIPPET_ORDERING_SUCCESS':
      return [
        ...action.sortedArray,
      ];
    default:
      return state;
  }
};

export default byId;
