import { FETCH_COLLECTIONS_PENDING, 
    FETCH_COLLECTIONS_SUCCESS, 
    FETCH_COLLECTIONS_FAILED } from './shop.constants';

    

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_PENDING,
});

export const fetchCollectionsSuccess = collectionMap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsError = error => ({
    type: FETCH_COLLECTIONS_FAILED,
    payload: error
});
