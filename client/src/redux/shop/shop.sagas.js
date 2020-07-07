import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionSnapshotTOMap } from '../../Firebase/firebase.util';

import { fetchCollectionsSuccess, fetchCollectionsError} from './shop.actions'

import { FETCH_COLLECTIONS_PENDING, 
    } from './shop.constants';

function* fetchCollectionAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotTOMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsError(error.message))
    }
    
}

function* fetchCollectionStart(){
    yield takeLatest(
        FETCH_COLLECTIONS_PENDING,
         fetchCollectionAsync);
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionStart)
    ])
}