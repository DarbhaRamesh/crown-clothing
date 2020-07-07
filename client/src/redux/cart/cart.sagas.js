import { all, call, takeLatest, put } from 'redux-saga/effects';

import { SIGN_OUT_SUCCESS } from '../user/user.constants';
import { clearCart } from './cart.actions';

function* clearCartOnSignOut(){
    yield put(clearCart());
}

function* onSignOutSuccess() {
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)])
}