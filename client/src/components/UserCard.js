import React from 'react';
import Avatar from './Avatar';
import { Link } from  'react-router-dom';

import '../styles/userCard.css';

function UserCard({children, user, handleClose, setShowFollowers, setShowFollowings}){

    function handelCloseAll(){
        if(handleClose) handleClose();
        if(setShowFollowers) setShowFollowers(false);
        if(setShowFollowings) setShowFollowings(false);
    }
    return (
        <li className='user-card' >
            <Link to={`/profile/${user._id}`} onClick={handelCloseAll} className='url-user'/>
            <Avatar src={user.avatar} size='big-avatar'/>
            <div className='fullName-wrapper'>
                <Link to={`/profile/${user._id}`} onClick={handelCloseAll} ><h6 className='fullName-user'>{user.fullname}</h6></Link>
                <span className='email-user'>{user.email}</span>
            </div>
            {children}
        </li>
    )
}

export default UserCard;