const defaultData = [];

const history = (state = defaultData, action) => {
  switch (action.type) {
    case 'SET_CENTER_TILE_SUCCESS':
      return [
        ...state,
        action.tileDetails,
      ];
    default:
      return state;
  }
};

export default history;
