import * as actionTypes from './actionTypes';

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
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token,
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
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId,
  };
};
