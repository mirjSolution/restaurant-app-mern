import {
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAIL,
  MENU_DETAILS_FAIL,
  MENU_DETAILS_REQUEST,
  MENU_DETAILS_SUCCESS,
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_FAIL,
} from '../constants/menuConstants';

export const menuListReducer = (state = { menus: [] }, action) => {
  switch (action.type) {
    case MENU_LIST_REQUEST:
      return { loading: true, menus: [] };
    case MENU_LIST_SUCCESS:
      return { loading: false, menus: action.payload };
    case MENU_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuDetailsReducer = (
  state = { menu: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MENU_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MENU_DETAILS_SUCCESS:
      return { loading: false, menu: action.payload };
    case MENU_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuDeleteReducer = (
  state = { menu: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MENU_DELETE_REQUEST:
      return { loading: true };
    case MENU_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MENU_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
