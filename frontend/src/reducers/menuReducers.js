import {
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAIL,
} from '../constants/menuConstants';

export const menuListReducer = (state = { menus: [] }, action) => {
  switch (action.type) {
    case MENU_LIST_REQUEST:
      return { loading: true };
    case MENU_LIST_SUCCESS:
      return { loading: false, menus: action.payload };
    case MENU_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
