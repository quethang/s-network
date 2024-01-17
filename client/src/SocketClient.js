import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { POST_TYPES } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import { MESSAGE_TYPES } from './redux/actions/messageAction';

import sound from './audio/sound-notify.mp3';

function SocketClient() {

    const auth = useSelector(state => state.auth);
    const socket = useSelector(state => state.socket);
    const notify = useSelector(state => state.notify);
    const dispatch = useDispatch();
    const audioRef = useRef();

    // useEffect(() => {
    //     socket.emit('joinUser', auth.user)
    // }, [socket, auth.user])
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    }, [socket, auth.user._id])

    //like
    useEffect(() => {
        socket.on('likeToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        })

        return (() => socket.off('likeToClient'))
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        })

        return (() => socket.off('unLikeToClient'))
    }, [socket, dispatch])

    //comment
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        })
        return (() => socket.off('createCommentToClient'))
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('updateCommentToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        })
        return (() => socket.off('updateCommentToClient'))
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        })
        return (() => socket.off('deleteCommentToClient'))
    }, [socket, dispatch])

    //follow
    useEffect(() => {
        socket.on('followToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
        })
        return (() => socket.off('followToClient'))
    }, [socket, dispatch, auth])

    useEffect(() => {
        socket.on('unFollowToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
        })
        return (() => socket.off('unFollowToClient'))
    }, [socket, dispatch, auth])

    //notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
            if (notify.sound) {
                audioRef.current.play();
            }
        })
        return (() => socket.off('createNotifyToClient'))
    }, [socket, dispatch, notify.sound])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg })
        })

        return (() => socket.off('removeNotifyToClient'))
    }, [socket, dispatch])

    //message
    useEffect(() =>{
        socket.on('addMessageToClient', msg => {
            console.log(msg.text)
            dispatch({type: MESSAGE_TYPES.ADD_MESSAGE, payload:msg});
            dispatch({type: MESSAGE_TYPES.ADD_USER, payload: {...msg.user, text: msg.text, media: msg.media}});
        })
        return(() => socket.off('addMessageToClient'))

    }, [socket, dispatch])
    return (
        <>
            <audio controls ref={audioRef}>
                <source src={sound} type='audio/mp3' />
            </audio>
        </>
    )
}

export default SocketClient;