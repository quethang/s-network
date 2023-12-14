import { GLOBALTYPES } from '../actions/globalTypes';
import { postDataAPI, getDataAPI } from '../../utils/fetchData';

export const MESSAGE_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
}

export function addUser({user, message}){
    return (dispatch) => {
        if(message.users.every(item => item._id !== user._id)){
            dispatch({type: MESSAGE_TYPES.ADD_USER, payload: {...user, text: '', media: []}});
        }
    }
}
export function addMessage({msg, auth, socket}){
    return async (dispatch) => {
        dispatch({type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg});
        socket.emit('addMessage', msg)

        try {
            await postDataAPI('message', msg, auth.token);
        } catch(err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
}
export function getConversations({auth, page = 1}){
    return async (dispatch) => {
        try {
            const res = await getDataAPI(`conversations?limit=${page * 9}`, auth.token);
            let newArr = [];
            res.data.conversations.forEach(item => {
                item.recipients.forEach(cv => {
                    if(cv._id !== auth.user._id){
                        newArr.push({...cv, text: item.text, media: item.media});
                    }
                })
            });

            dispatch({
                type: MESSAGE_TYPES.GET_CONVERSATIONS, 
                payload: {newArr, result: res.data.result}
            });
        } catch (err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
}
export function getMessages({auth, id, page = 1}){
    return async (dispatch) => {
        try {
            const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token);
            const newData = {...res.data, messages: res.data.messages.reverse()}
            dispatch({type: MESSAGE_TYPES.GET_MESSAGES, payload: {...newData, _id: id, page}})
            
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
} 


export const loadMoreMessages = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: MESSAGE_TYPES.UPDATE_MESSAGES, payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}