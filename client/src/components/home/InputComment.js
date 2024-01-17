import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from '../../redux/actions/commentAction';

function InputComment({ children, post, onReply, setOnReply }) {
    const [content, setContent] = useState('');
    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const reactions = [
        '🙂', '😀', '😄', '😆', '😅', '😂', '🤣', '😊', '😌',
        '😉', '😏', '😍', '😘', '😗', '😙', '😚', '🤗', '😳',
        '🙃', '😇', '😛', '😝', '😜', '😋', '🤤', '🤓', '😎',
        '🤑', '😒', '🙁', '☹️', '😞', '😔', '😖', '😓', '😢',
        '😢', '😭', '😟', '😣', '😩', '😫', '😕', '🤔', '🙄',
        '😤', '😶', '🤐', '😐', '😑', '😯', '😲', '😧', '😨',
        '😰', '😱', '😪', '😴', '😬', '🤥', '🤧', '🤒', '😷',
        '🤕', '😵', '😈', '😠', '😡', '🤢', '🤠', '🤡', '👿',
        '👹', '👺', '👻', '💀', '👽', '👾', '🤖', '💩', '🎃'
    ];

    function handleChange(e) {
        setContent(e.target.value);
    }

    function handleAddIcon(icon){
        setContent(content + icon);
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
        dispatch(createComment({ post, newComment, auth, socket }));

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
                    style={{filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'var(--light)' : 'var(--dark)'}}
                />
                <div className="icon-wrapper dropdown">
                    <i className="far fa-smile icon" data-toggle='dropdown' />
                    <ul className='list-reactions dropdown-menu'>
                        {
                            reactions.map((icon, index) => (
                                <li key={index} onClick={() => handleAddIcon(icon)} 
                                    style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>
                                    {icon}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <button type="submit" className="button-comment">
                    <i className="fas fa-paper-plane" />
                </button>
            </div>
        </form>
    )
}

export default InputComment;