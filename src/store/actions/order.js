import * as actionTypes from './actionTypes';
import axios from '../../axios';

// Purchase Burger
export const purchaseBurgerSuccess = (
  id,
  orderData
) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return async (dispatch) => {
    try {
      dispatch(purchaseBurgerStart());

      const res = await axios.post(
        `/orders.json?auth=${token}`,
        orderData
      );

      dispatch(
        purchaseBurgerSuccess(res.data.name, orderData)
      );
    } catch (err) {
      dispatch(purchaseBurgerFailed(err));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// Orders
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchOrdersStart());

      const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const res = await axios.get(
        `/orders.json${queryParams}`
      );
      const fetchedOrders = [];

      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }

      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrdersFailed(err));
    }
  };
};
