import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.6,
  meat: 1.1,
  bacon: 0.9,
};

const POPULAR_MENU = {
  bigMac: {
    salad: 2,
    cheese: 1,
    meat: 1,
    bacon: 2,
  },
  whopper: {
    salad: 1,
    cheese: 1,
    meat: 1,
    bacon: 1,
  },
  cheeseLover: {
    salad: 1,
    cheese: 3,
    meat: 1,
    bacon: 1,
  },
  carnivore: {
    salad: 1,
    cheese: 1,
    meat: 2,
    bacon: 2,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]:
            state.ingredients[action.name] + 1,
        },
        totalPrice:
          state.totalPrice +
          INGREDIENT_PRICES[action.name],
        building: true,
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]:
            state.ingredients[action.name] - 1,
        },
        totalPrice:
          state.totalPrice -
          INGREDIENT_PRICES[action.name],
        building: true,
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    case actionTypes.SET_MENU:
      let newPrice = 4;

      for (let item in POPULAR_MENU[action.menu]) {
        newPrice +=
          INGREDIENT_PRICES[item] *
          POPULAR_MENU[action.menu][item];
      }

      return {
        ...state,
        ingredients: {
          salad: POPULAR_MENU[action.menu].salad,
          meat: POPULAR_MENU[action.menu].meat,
          cheese: POPULAR_MENU[action.menu].cheese,
          bacon: POPULAR_MENU[action.menu].bacon,
        },
        building: true,
        totalPrice: newPrice,
      };

    default:
      return state;
  }
};

export default reducer;
