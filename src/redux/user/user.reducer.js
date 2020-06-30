import {SET_CURRENT_USER} from './user.constants';

const initialState = {
    currentUser:null
}


const userReducer = (state = initialState,action = {}) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return Object.assign({},state,{currentUser:action.payload})
        default:
            return state;
    }
}

export default userReducer;