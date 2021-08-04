import axios from "axios";

//constants
const SET_PRODUCTS = "SET_PRODUCTS";

//actions
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

//thunks
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const productsRes = await axios.get("/api/products");
      const products = productsRes.data;
      dispatch(setProducts(products));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
