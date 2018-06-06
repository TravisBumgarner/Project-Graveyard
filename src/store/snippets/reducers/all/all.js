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
    case 'PUT_CATEGORIES_SUCCESS':
      return [
        ...state.filter(c => c.id !== action.data.id),
        action.data,
      ];
    default:
      return state;
  }
};

export default all;

