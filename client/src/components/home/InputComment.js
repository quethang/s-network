import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from '../../redux/actions/commentAction';

function InputComment({ children, post, onReply, setOnReply }) {
    const [content, setContent] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function handleChange(e) {
        setContent(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }


        setContent('');

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        dispatch(createComment({ post, newComment, auth }));

        if (setOnReply) return setOnReply(false);
    }
    return (
        <form className="form-comment-post" onSubmit={handleSubmit}>
            <div className="input-comment-wrapper">
                {children}
                <input
                    className="input-comment"
                    type="text"
                    placeholder="Comment..."
                    value={content}
                    onChange={handleChange}
                />
                <button type="submit" className="button-comment">
                    <i className="fas fa-paper-plane" />
                </button>
            </div>
        </form>
    )
}

export default InputComment;