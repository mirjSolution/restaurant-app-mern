import axios from 'axios';
import {
  MENU_LIST_FAIL,
  MENU_LIST_SUCCESS,
  MENU_LIST_REQUEST,
  MENU_DETAILS_REQUEST,
  MENU_DETAILS_SUCCESS,
  MENU_DETAILS_FAIL,
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_FAIL,
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAIL,
  MENU_UPDATE_FAIL,
  MENU_UPDATE_SUCCESS,
  MENU_UPDATE_REQUEST,
  MENU_CREATE_REVIEW_SUCCESS,
  MENU_CREATE_REVIEW_FAIL,
  MENU_CREATE_REVIEW_REQUEST,
  MENU_TOP_REQUEST,
  MENU_TOP_SUCCESS,
  MENU_TOP_FAIL,
} from '../constants/menuConstants';

export const listMenus = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: MENU_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/menus?keyword=${keyword}&pageNumber=${pageNumber}`
    );

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

export const deleteMenu = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/menus/${id}`, config);

    dispatch({
      type: MENU_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MENU_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMenu = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/menus`, {}, config);

    dispatch({
      type: MENU_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENU_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMenu = (menu) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/menus/${menu._id}`, menu, config);

    dispatch({
      type: MENU_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: MENU_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MENU_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMenuReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MENU_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/menus/${productId}/reviews`, review, config);

    dispatch({
      type: MENU_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MENU_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopMenus = () => async (dispatch) => {
  try {
    dispatch({ type: MENU_TOP_REQUEST });

    const { data } = await axios.get('api/menus/top');

    dispatch({
      type: MENU_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENU_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
