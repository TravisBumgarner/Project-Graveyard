const byId = (state = [], action) => {
  switch (action.type) {
    case 'GET_SNIPPETS_SUCCESS':
      return {
        ...state,
        ...action.data.byId,
      };
    case 'POST_SNIPPETS_SUCCESS':
      return {
        ...state,
        ...action.data.id,
      };
    default:
      return state;
  }
};

export default byId;
