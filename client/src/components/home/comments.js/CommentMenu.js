import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../redux/actions/commentAction';

function CommentMenu({ post, comment, setOnEdit}) {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()

    function handleRemove() {
        if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
            dispatch(deleteComment({post, auth, comment}))
        }
    }

    function handleEdit(){
        setOnEdit(true);
    }

    function MenuItem() {
        return (
            <>
                <div className="dropdown-item" onClick={handleEdit}>
                    <i className="fa-solid fa-pen"></i>Edit
                </div>
                <div className="dropdown-item" onClick={handleRemove}>
                    <i className="fa-solid fa-trash"></i>Remove
                </div>
            </>
        )
    }
    
    return (
        <div className="comment-menu">
            {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="dropdown">
                    <i className="fa-solid fa-ellipsis" data-toggle="dropdown"></i>
                    <div className="dropdown-menu">
                        {
                            post.user._id === auth.user._id
                                ? comment.user._id === auth.user._id
                                    ? MenuItem()
                                    : <div className="dropdown-item" onClick={handleRemove}><i className="fa-solid fa-trash"></i>Remove</div>
                                : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu;