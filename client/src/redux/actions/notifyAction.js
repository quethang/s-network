import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI, getDataAPI } from '../../utils/fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY'
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
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
}