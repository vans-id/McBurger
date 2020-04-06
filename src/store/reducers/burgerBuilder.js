import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.6,
  meat: 1.1,
  bacon: 0.9
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]:
            state.ingredients[action.name] + 1
        },
        totalPrice:
          state.totalPrice +
          INGREDIENT_PRICES[action.name],
        building: true
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]:
            state.ingredients[action.name] - 1
        },
        totalPrice:
          state.totalPrice -
          INGREDIENT_PRICES[action.name],
        building: true
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
