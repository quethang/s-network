import { MESSAGE_TYPES } from "../actions/messageAction";

const initialState = {
    users: [],
    resultUser: 0,
    data: [],
    resultData: 0,
    firstLoad: false
}

function messageReducer(state = initialState, action){
    switch (action.type){
        case MESSAGE_TYPES.ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        default:
            return state;
    }
}

export default messageReducer;