import {
  takeEvery,
  all,
  takeLatest,
} from 'redux-saga/effects';

import {
  logoutSaga,
  checkoutAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import {
  purchaseBurgerSaga,
  fetchOrdersSaga,
} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(
      actionTypes.AUTH_INITIATE_LOGOUT,
      logoutSaga
    ),
    takeEvery(
      actionTypes.AUTH_CHECK_TIMEOUT,
      checkoutAuthTimeoutSaga
    ),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(
      actionTypes.AUTH_CHECK_STATE,
      authCheckStateSaga
    ),
  ]);
}

export function* watchBurger() {
  yield takeEvery(
    actionTypes.INIT_INGREDIENTS,
    initIngredientsSaga
  );
}

export function* watchOrder() {
  yield takeLatest(
    actionTypes.PURCHASE_BURGER,
    purchaseBurgerSaga
  );
  yield takeEvery(
    actionTypes.FETCH_ORDERS,
    fetchOrdersSaga
  );
}
