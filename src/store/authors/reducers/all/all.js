const all = (state = [], action) => {
  switch (action.type) {
    case "GET_AUTHORS_SUCCESS":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default all;