import { put } from 'redux-saga/effects';
import axios from '../../axios';

import * as actions from '../actions/index';

export function* initIngredientsSaga() {
  try {
    const res = yield axios.get('/ingredients.json');

    yield put(actions.setIngredients(res.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
