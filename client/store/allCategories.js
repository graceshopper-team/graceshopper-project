import axios from 'axios';

//constants
const SET_CATEGORIES = 'SET_CATEGORIES';

//actions
export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

//thunks
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const categoriesRes = await axios.get('/api/category');
      const categories = categoriesRes.data;
      dispatch(setCategories(categories));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function allCategoriesReducer(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
