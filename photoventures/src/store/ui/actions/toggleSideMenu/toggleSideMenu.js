export const TOGGLE_SIDE_MENU_START = 'TOGGLE_SIDE_MENU_START';
export const TOGGLE_SIDE_MENU_SUCCESS = 'TOGGLE_SIDE_MENU_SUCCESS';
export const TOGGLE_SIDE_MENU_FAILURE = 'TOGGLE_SIDE_MENU_FAILURE';

export const toggleSideMenuStart = () => ({
  type: TOGGLE_SIDE_MENU_START,
});

export const toggleSideMenuSuccess = () => ({
  type: TOGGLE_SIDE_MENU_SUCCESS,
});

export const toggleSideMenuFailure = error => ({
  type: TOGGLE_SIDE_MENU_FAILURE,
  error,
});

export const toggleSideMenu = () => (dispatch) => {
  dispatch(toggleSideMenuSuccess());
};
