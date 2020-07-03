import { FETCH_COLLECTIONS_PENDING, 
    FETCH_COLLECTIONS_SUCCESS, 
    FETCH_COLLECTIONS_FAILED } from './shop.constants';

    import { firestore, convertCollectionSnapshotTOMap } from '../../Firebase/firebase.util';

const fetchCollectionsPending = () => ({
    type: FETCH_COLLECTIONS_PENDING,
});

const fetchCollectionsSuccess = collectionMap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

const fetchCollectionsError = error => ({
    type: FETCH_COLLECTIONS_FAILED,
    payload: error
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsPending());

        collectionRef.get().then(snapshot =>{
            const collectionsMap = convertCollectionSnapshotTOMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsError(error)));
    }
}
