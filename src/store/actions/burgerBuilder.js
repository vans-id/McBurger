import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    name: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    name: ingName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

// w redux-thunk
export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/ingredients.json');

      dispatch(setIngredients(res.data));
    } catch (err) {
      dispatch(fetchIngredientsFailed());
    }
  };
};

export const setMenu = (menu) => {
  return { type: actionTypes.SET_MENU, menu };
};
