import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import { getUserCartRef } from '../../Firebase/firebase.util';

import { SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from '../user/user.constants';
import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM_FROM_CART } from './cart.constants';

import { selectCurrentUser } from '../user/user.selectors';
import { selectCartItems } from './cart.selectors';

import { clearCart, setCartFromFirebase } from './cart.actions';

function* clearCartOnSignOut(){
    yield put(clearCart());
}

function* onSignOutSuccess() {
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
}
function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
      try {
        const cartRef = yield getUserCartRef(currentUser.id);
        const cartItems = yield select(selectCartItems);
        yield cartRef.update({ cartItems });
      } catch (error) {
        console.log(error);
      }
    }
}
  
function* checkCartFromFirebase({ payload: user }) {
const cartRef = yield getUserCartRef(user.id);
const cartSnapshot = yield cartRef.get();
yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

function* onUserSignIn() {
    yield takeLatest(SIGN_IN_SUCCESS, checkCartFromFirebase);
}
  
function* onCartChange() {
yield takeLatest(
    [
    ADD_ITEM,
    REMOVE_ITEM,
    CLEAR_ITEM_FROM_CART
    ],
    updateCartInFirebase
);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess), 
        call(onCartChange), 
        call(onUserSignIn)])
}