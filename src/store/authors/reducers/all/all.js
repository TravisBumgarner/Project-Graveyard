const all = (state = {}, action) => {
  switch (action.type) {
    case 'GET_AUTHORS_SUCCESS':
      return {
        ...state,
        ...action.data.all,
      };
    case 'POST_AUTHORS_SUCCESS':
      return {
        ...state,
        [action.data.id]: action.data,
      };
    case 'PUT_AUTHORS_SUCCESS':
      return {
        ...state,
        [action.data.id]: action.data,
      };
    default:
      return state;
  }
};

export default all;
