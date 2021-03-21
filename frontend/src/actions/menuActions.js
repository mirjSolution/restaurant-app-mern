import axios from 'axios';
import {
  MENU_LIST_FAIL,
  MENU_LIST_SUCCESS,
  MENU_LIST_REQUEST,
  MENU_DETAILS_REQUEST,
  MENU_DETAILS_SUCCESS,
  MENU_DETAILS_FAIL,
} from '../constants/menuConstants';

export const listMenus = () => async (dispatch) => {
  try {
    dispatch({ type: MENU_LIST_REQUEST });

    const { data } = await axios.get('/api/menus');

    dispatch({
      type: MENU_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENU_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMenuDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MENU_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/menus/${id}`);

    dispatch({
      type: MENU_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENU_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
