const defaultData = {
  isSideMenuOpen: false,
  isWhereToOpen: true,
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
        isSideMenuOpen: !state.isSideMenuOpen,
      };
    case 'TOGGLE_WHERE_TO_SUCCESS':
      return {
        ...state,
        isWhereToOpen: !state.isWhereToOpen,
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
