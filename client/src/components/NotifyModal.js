import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction'

function NotifyModal() {
    const auth = useSelector(state => state.auth);
    const notify = useSelector(state => state.notify);
    const dispatch = useDispatch();

    function handleIsRead(msg){
        dispatch(isReadNotify({msg, auth}))
    }

    function handleDeleteAll(){
        if(window.confirm('Are you sure want delete all?')){
            dispatch(deleteAllNotifies(auth.token));
        }
    }

    return (
        <div className='list-notify-wrapper'>
            <div className='list-notify-wrapper-header'>
                <h6 className='title'>Notification</h6>
            </div>

            <ul className='list-notify'>
                {
                    notify.data.length === 0 && <h6 className='text-not-notify'>No notification</h6>
                }
                {
                    notify.data.map((msg, index) => (
                        <li key={index} className='notify-item' onClick={() => handleIsRead(msg)}>
                            <Link to={`${msg.url}`} />
                            <div className='notify-item-avatar-wrapper'>
                                <img className='notify-item-avatar' src={msg.user.avatar} alt={msg.image} />
                            </div>
                            <div className='notify-item-text'>
                                <span className='notify-item-title'><span className='author'>{msg.user.fullname}</span>{msg.text}</span>
                                <span className='notify-item-time'>{moment(msg.createdAt).fromNow()}</span>
                            </div>
                            <div>
                                {
                                    !msg.isRead && <div className='notify-item-dot' />
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                notify.data.length > 0 &&
                (   
                    <div className='list-notify-wrapper-footer'>
                        <span onClick={handleDeleteAll}>Delete all</span>
                    </div>
                )
            }
        </div>
    )

}


export default NotifyModal