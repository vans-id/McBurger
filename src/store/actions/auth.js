import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expTime,
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

// Check token validity in local storage (if have any)
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem('expirationDate')
      );

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() -
              new Date().getTime()) /
              1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
