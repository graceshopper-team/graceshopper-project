import axios from 'axios';

const SET_CART = 'SET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
const CLEAR_CART_STORE = 'CLEAR_CART_STORE';
const ADD_TO_CART = 'ADD_TO_CART';

const TOKEN = 'token';

//action creator
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const addToCart = () => {
  return {
    type: ADD_TO_CART,
  };
};

//this is for when a user logs out
export const clearCartStore = () => {
  return {
    type: CLEAR_CART_STORE,
  };
};

export const changeQty = (row) => {
  let id = row.data.id;
  let quantity = row.data.quantity;
  return {
    type: CHANGE_QUANTITY,
    id,
    quantity,
  };
};

export const deleteCartItem = (userId, productId) => {
  return {
    type: DELETE_ITEM,
    userId,
    productId,
  };
};

// thunks
export const addToCartThunk = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        await axios.post(`/api/cart/${userId}`, {
          productId,
          quantity,
          headers: {
            authorization: token,
          },
        });
        dispatch(fetchCart(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await axios.delete(`/api/cart/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(clearCartStore());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await axios.delete(`/api/cart/${userId}/${productId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(deleteCartItem(userId, productId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeQuantityThunk = (quantity, rowId, userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const product = await axios.put(`/api/cart/${userId}`, {
          quantity: quantity,
          rowId: rowId,
          headers: {
            authorization: token,
          },
        });
        dispatch(changeQty(product));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// NOTE: Tokens get grabbed to send to the express rotuers here for verification
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/cart/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCart(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_CART_STORE:
      return [];
    case CHANGE_QUANTITY:
      let cartl = state;
      cartl = cartl.map((element) => {
        if (element.id === Number(action.id))
          element.quantity = action.quantity;
        return element;
      });
      return cartl;
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
