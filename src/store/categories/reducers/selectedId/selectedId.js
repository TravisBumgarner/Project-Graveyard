const selectedId = (state = -1, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ID_SUCCESS':
      return action.id;
    default:
      return state;
  }
};

export default selectedId;
