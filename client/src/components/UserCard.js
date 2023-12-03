import React from 'react';
import { Link } from  'react-router-dom';

function UserCard({children, user, handleClose, setShowFollowers, setShowFollowings}){

    function handelCloseAll(){
        if(handleClose) handleClose();
        if(setShowFollowers) setShowFollowers(false);
        if(setShowFollowings) setShowFollowings(false);
    }
    return (
        <li className='user-card' >
            <Link to={`/profile/${user._id}`} onClick={handelCloseAll} className='url-user'/>
            <div>
                <div className='avatar-wrapper'>
                    <Link to={`/profile/${user._id}`} onClick={handelCloseAll} className='url-user'/>
                    <img className='avatar' src={user.avatar} alt='avatar'/>
                </div>
                <div className='fullName-wrapper'>
                    <Link to={`/profile/${user._id}`} onClick={handelCloseAll} ><h6 className='fullName-user'>{user.fullname}</h6></Link>
                    <span className='email-user'>{user.email}</span>
                </div>
            </div>
            {children}
        </li>
    )
}

export default UserCard;