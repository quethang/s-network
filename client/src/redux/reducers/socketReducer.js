import { GLOBALTYPES } from '../actions/globalTypes';

function socketReducer(state = [], action){

    switch(action.type){
        case GLOBALTYPES.SOCKET:
            return action.payload;
        default:
            return state;
    }
}

export default socketReducer;