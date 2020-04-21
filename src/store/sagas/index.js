import { takeEvery } from 'redux-saga/effects';

import {
  logoutSaga,
  checkoutAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(
    actionTypes.AUTH_INITIATE_LOGOUT,
    logoutSaga
  );
  yield takeEvery(
    actionTypes.AUTH_CHECK_TIMEOUT,
    checkoutAuthTimeoutSaga
  );
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(
    actionTypes.AUTH_CHECK_STATE,
    authCheckStateSaga
  );
}

export function* watchBurger() {
  yield takeEvery(
    actionTypes.INIT_INGREDIENTS,
    initIngredientsSaga
  );
}
