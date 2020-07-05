import { takeLatest, put, all, call } from 'redux-saga/effects';

import {auth, 
    googleProvider, 
    createUserProfileDocument,
    getCurrentUser
} from '../../Firebase/firebase.util';

import {GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    CHECK_USER_SESSION,
    SIGN_OUT_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS} from './user.constants';
    
import { signInSuccess, 
    signInFailure, 
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess} from './user.actions';

function* getSnapshotFromUserauth(userAuth, additionalData){
    try{
        const useRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield useRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
            );
    } catch(error){
        yield put(signInFailure( error.message));
    }

}

function* signInWithGoogle(){
    try{
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield call(getSnapshotFromUserauth, user);

    }catch(error){
        yield put(signInFailure( error.message));
    }
}

function* signInWithEmail({payload: {email, password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield call(getSnapshotFromUserauth, user);

    }catch(error){
        yield put(signInFailure(error.message));
    }
}

function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser;
        if(!userAuth)return;
        yield getSnapshotFromUserauth(userAuth);
    } catch(error){
        yield put(signInFailure(error.message));
    }
}

function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error){
        yield put(signOutFailure(error.message))
    }
}

function* signUp({payload:{email, password, displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user: user, additionalData: {displayName} }))
    } catch(error){
        yield put(signUpFailure(error.message))
    }
}

function* signInAfterSignUp({ payload:{user, additionalData}}){
    try{
        yield getSnapshotFromUserauth(user, additionalData);
    } catch(error){
        yield put(signInFailure(error.message));
    }
}

function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
}

function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

function* onSignOutStart(){
    yield takeLatest(SIGN_OUT_START, signOut)
}

function* onSignUpStart(){
    yield takeLatest(SIGN_UP_START, signUp)
}

function* onSignUpSuccess(){
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}