const all = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        ...action.data.all,
      };
    case 'POST_CATEGORIES_SUCCESS':
      return {
        ...state,
        [action.data.id]: action.data,
      };
    case 'PUT_CATEGORIES_SUCCESS':
      return {
        ...state,
        [action.data.id]: action.data,
      };
    default:
      return state;
  }
};

export default all;
