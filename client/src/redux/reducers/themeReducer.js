import { GLOBALTYPES } from '../actions/globalTypes';

const inititalState = false;

function themeReducer(state = inititalState, action){

    switch(action.type){
        case GLOBALTYPES.THEME:
            return action.payload;
        default:
            return state;
    }
}

export default themeReducer;