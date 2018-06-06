const all = (state = [], action) => {
  switch (action.type) {
    case 'GET_SNIPPETS_SUCCESS':
      return [
        ...state,
        ...action.data,
      ];
    case 'POST_SNIPPETS_SUCCESS':
      return [
        ...state,
        action.data,
      ];
    default:
      return state;
  }
};

export default all;

