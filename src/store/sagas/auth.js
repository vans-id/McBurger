import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actions.logoutSucceed());
}

export function* checkoutAuthTimeoutSaga(action) {
  yield delay(action.expTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1sByHCOtnSKyRomAVldHiMFQzm_OMEgA';

  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1sByHCOtnSKyRomAVldHiMFQzm_OMEgA';
  }
  try {
    const res = yield axios.post(url, authData);

    // Give token to local storage
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem(
      'token',
      res.data.idToken
    );
    yield localStorage.setItem(
      'expirationDate',
      expirationDate
    );
    yield localStorage.setItem(
      'userId',
      res.data.localId
    );

    yield put(
      actions.authSuccess(
        res.data.idToken,
        res.data.localId
      )
    );
    yield put(
      actions.checkAuthTimeout(res.data.expiresIn)
    );
  } catch (error) {
    yield put(
      actions.authFailed(error.response.data.error)
    );
  }
}
