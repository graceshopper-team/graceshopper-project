import axios from 'axios';

const SET_CART = 'SET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
//deletecart , remove item, update item

//action creator
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const increaseQty = (row) => {
  let id = row.data.id;
  return {
    type: INCREASE_QUANTITY,
    id,
  };
};

export const decreaseQty = (row) => {
  let id = row.data.id;
  return {
    type: DECREASE_QUANTITY,
    id,
  };
};

export const deleteCartItem = (userId, productId) => {
  return {
    type: DELETE_ITEM,
    userId,
    productId,
  };
};

export const deleteThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${userId}/${productId}`);
      dispatch(deleteCartItem(userId, productId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const increaseQuantityThunk = (quantity, rowId) => {
  return async (dispatch) => {
    try {
      const product = await axios.put('/api/cart/:userId', {
        quantity: quantity,
        rowId: rowId,
      });
      dispatch(increaseQty(product));
    } catch (error) {
      console.error(error);
    }
  };
};

export const decreaseQuantityThunk = (quantity, rowId) => {
  return async (dispatch) => {
    try {
      const product = await axios.put('/api/cart/:userId', {
        quantity: quantity,
        rowId: rowId,
      });
      dispatch(decreaseQty(product));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCart = (userId) => {
  console.log(userId, typeof userId);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      dispatch(setCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case INCREASE_QUANTITY:
      let cartl = state;
      cartl = cartl.map((element) => {
        if (element.id === Number(action.id))
          element.quantity = element.quantity + 1;
        return element;
      });
      return cartl;
    case DECREASE_QUANTITY:
      let cartr = state;
      cartr = cartr.map((element) => {
        if (element.id === Number(action.id))
          element.quantity = element.quantity - 1;
        return element;
      });
      return cartr;
    case DELETE_ITEM:
      let cart = state;
      let toDelete = Number(action.productId);
      cart = cart.filter((element) => {
        if (element.productId !== toDelete) return element;
      });
      return cart;
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
