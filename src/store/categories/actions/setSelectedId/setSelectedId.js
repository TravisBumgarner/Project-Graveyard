export const setSelectedIdSuccess = id => ({
  type: 'SET_SELECTED_ID_SUCCESS',
  id,
});

export const setSelectedId = (id) => {
  return (dispatch) => {
    dispatch(setSelectedIdSuccess(id));
  };
};
