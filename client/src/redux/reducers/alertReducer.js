import { GLOBALTYPES } from '../actions/globalTypes';

const inititalState = {}

function alertReducer(state = inititalState, action){

    switch(action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;