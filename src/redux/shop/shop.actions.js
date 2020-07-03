import { UPDATE_COLLECTIONS } from './shop.constants';

export const updateCollection = (collectionsMap) => ({
    type: UPDATE_COLLECTIONS,
    payload: collectionsMap
})