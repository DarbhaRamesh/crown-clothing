import { FETCH_COLLECTIONS_PENDING, 
    FETCH_COLLECTIONS_SUCCESS, 
    FETCH_COLLECTIONS_FAILED } from './shop.constants';

const INITIAL_STATE = {
    collections : null,
    isFetching: false,
    errorMessage : undefined
} 

const shopReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_COLLECTIONS_PENDING:
            return{
                ...state,
                isFetching: true
            }
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case FETCH_COLLECTIONS_FAILED:
            return {
                ...state,
                isFetching: false,
                errorMessage:action.payload
            }
        default:
            return state;
    }
}

export default shopReducer