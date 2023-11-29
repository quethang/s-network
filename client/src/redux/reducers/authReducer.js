import { GLOBALTYPES } from '../actions/globalTypes';

const inititalState = {}

function authReducer(state = inititalState, action){

    switch(action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;