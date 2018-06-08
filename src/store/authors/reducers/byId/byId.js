const byId = (state = [], action) => {
  switch (action.type) {
    case 'GET_AUTHORS_SUCCESS':

      return {
        ...state,
        ...action.data.byId,
      };
    default:
      return state;
  }
};

export default byId;
