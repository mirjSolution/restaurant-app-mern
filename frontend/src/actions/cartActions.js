import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, order) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/menus/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      menuId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      orderCount: data.orderCount,
      order,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
