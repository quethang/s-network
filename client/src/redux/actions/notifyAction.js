import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export function createNotify({msg, auth, socket}){
    return async (dispatch) => {

        try {
            const res = await postDataAPI('notify', msg, auth.token)   
            socket.emit('createNotify', {
                ...res.data.notify,
                user: {
                    fullname: auth.user.fullname,
                    avatar: auth.user.avatar
                }
            })
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
}

export function removeNotify({msg, auth, socket}){
    return async (dispatch) => {
        // console.log(msg)
        try {
            await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)        
            socket.emit('removeNotify', msg)
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
}

export function getNotifies(token){
    return async (dispatch) => {
        try {
            const res = await getDataAPI('notifies', token)            
            dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
}

export function isReadNotify({msg, auth}){
    return async (dispatch) => {
        dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}});

        try {
            await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token);
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
}

export function deleteAllNotifies(token){
    return async (dispatch) => {

        dispatch({type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: []})
        try {
            await patchDataAPI(`deleteAllNotify`, null, token);
        } catch (err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
}