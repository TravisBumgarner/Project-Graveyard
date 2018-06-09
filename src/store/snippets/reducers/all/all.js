const all = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SNIPPETS_SUCCESS':
      return {
        ...state,
        ...action.data.all,
      };
    case 'POST_SNIPPETS_SUCCESS':
      console.log('hi');
      return {
        ...state,
        [action.data.id]: action.data,
      };
    case 'PUT_SNIPPETS_SUCCESS':
      return {
        ...state,
        [action.data.id]: action.data,
      };
    default:
      return state;
  }
};

export default all;

