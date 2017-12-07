const defaultData = {
  sideMenuOpen: false,
  window: {
    width: 0,
    height: 0,
  },
};

const meta = (state = defaultData, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU_SUCCESS':
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };
    case 'SET_WINDOW_SIZE_SUCCESS':
      return {
        ...state,
        window: {
          width: action.width,
          height: action.height,
        },
      };
    default:
      return state;
  }
};

export default meta;
