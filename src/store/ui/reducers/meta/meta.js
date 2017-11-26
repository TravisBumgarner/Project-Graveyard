const defaultData = {
  sideMenuOpen: false,
}

const meta = (state = defaultData, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU_SUCCESS':
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };

    default:
      return state;
  }
};

export default meta;
