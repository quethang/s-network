import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

import { GLOBALTYPES } from '../../../redux/actions/globalTypes';

function PostHeader({ post }) {

    const auth = useSelector(state => state.auth);
    const dispacth = useDispatch();
    const dropDown = useRef(null);

    function handleShow(){
        if(dropDown.current.classList.contains('show')){
            dropDown.current.classList.remove('show');
        } else{
            dropDown.current.classList.add('show');
        }
    }

    function handleEditPost(){
        handleShow();
        dispacth({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}});
    }
    
    return (
        <div className="header-post-wrapper">
            <div className="header-post">
                <div className="avatar-wrapper">
                    <Link to={`profile/${post.user._id}`} />
                    <img className="avatar" src={post.user.avatar} alt="avatar"/>
                </div>
                <div className="name-wrapper">
                    <Link to={`profile/${post.user._id}`}><h6 className="fullname">{post.user.fullname}</h6></Link>
                    <small className="date-post">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
                <div className="dropdown" ref={dropDown}>
                    <div className="icon-dropdown" onClick={handleShow}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    

                        <ul className='dropdown-menu'>
                            {
                                auth.user._id === post.user._id &&
                                <>
                                    <li className="dropdown-item" onClick={handleEditPost}>
                                        <i className="fa-solid fa-pen"></i><span className="name-option">Edit Post</span>
                                    </li>
                                    <li className="dropdown-item">
                                        <i className="fa-solid fa-trash"></i><span className="name-option">Delete Post</span>
                                    </li>
                                </>
                            }
                            <li className="dropdown-item">
                                <i className="fa-solid fa-copy"></i><span className="name-option">Copy Link</span>
                            </li>
                        </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default PostHeader;