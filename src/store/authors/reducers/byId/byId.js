const byId = (state = [], action) => {
  switch (action.type) {
    case "GET_AUTHORS_SUCCESS":
      const newIds = action.data.map(d => d.id);

      return {
        ...state,
        ...newIds,
      };
    default:
      return state;
  }
};

export default byId;