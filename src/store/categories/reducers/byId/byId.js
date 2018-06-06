const byId = (state = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':

      return {
        ...state,
        ...action.data.map(d => d.id),
      };
    default:
      return state;
  }
};

export default byId;
