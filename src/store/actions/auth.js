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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      const authData = {
        email,
        password,
        returnSecureToken: true,
      };

      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1sByHCOtnSKyRomAVldHiMFQzm_OMEgA';

      if (!isSignup) {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1sByHCOtnSKyRomAVldHiMFQzm_OMEgA';
      }

      const res = await axios.post(url, authData);

      // Give token to local storage
      const expirationDate = new Date(
        new Date().getTime() +
          res.data.expiresIn * 1000
      );

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem(
        'expirationDate',
        expirationDate
      );
      localStorage.setItem('userId', res.data.localId);

      dispatch(
        authSuccess(res.data.idToken, res.data.localId)
      );
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
      dispatch(authFailed(err.response.data.error));
    }
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
