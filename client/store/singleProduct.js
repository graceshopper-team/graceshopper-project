import axios from 'axios';

const initialState = {};

//action type
const SET_PRODUCT = 'SET_PRODUCT';
const ClEAR_PRODUCT = 'CLEAR_PRODUCT';

//action creator
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

export const clearProduct = () => {
  return {
    type: ClEAR_PRODUCT,
  };
};

//think creator
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(setProduct(data));
    } catch (err) {
      dispatch(setProduct('invalid'));
      console.log(err);
    }
  };
};

//Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ClEAR_PRODUCT:
      return {};
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
