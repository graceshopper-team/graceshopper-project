import axios from 'axios';

//constants
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FILTER = "SET_FILTER";
const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"

//actions
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const searchProducts = (products) => {
  return SEARCH_PRODUCTS,
  products
}

export const setFilter = (filter="none") => {
  return  {
    type: SET_FILTER,
    filter
  }
}

export const fetchSearch = (filter) => {
  return async (dispatch) => {
    try {
      const productsRes = await axios.get('/api/products/search', {params: {filter: filter}});
      const products = productsRes.data;
      dispatch(setProducts(products));
    } catch (error) {
      console.error(error);
    }
  };

}

//thunks
export const fetchProducts = (filter="none") => {
  return async (dispatch) => {
    try {
      const productsRes = await axios.get('/api/products', {params: {filter: filter}});
      const products = productsRes.data;
      dispatch(setProducts(products));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function allProductsReducer(state = {list: [],filter: "none"}, action) {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return {...state, list: action.products};
    case SET_PRODUCTS:
      return {...state, list: action.products};
    case SET_FILTER:
      return {...state, filter: action.filter}
    default:
      return state;
  }
}
