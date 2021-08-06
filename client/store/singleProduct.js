import axios from 'axios';

const initialState = {};

//action type
const SET_PRODUCT = 'SET_PRODUCT';

//action creator
export const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        product
    };
};

//think creator
export const fetchSingleProduct = (productId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/products/${productId}`);
            console.log('data within thunk creator: ', data);
            dispatch(setProduct(data));
        } catch(err) {
            console.log(err);
        }
    };
};

//Reducer
export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PRODUCT:
            return action.product;

        default:
            return state;
    }
}
