import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import ButtonLike from "../../ButtonLike";
import CommentMenu from "./CommentMenu";
import {
    updateComment,
    likeComment,
    unlikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

function CommentCard({ children, comment, post, commentId }) {
    const auth = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.theme);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [readMore, setReadMore] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [onReply, setOnReply] = useState(false);

    useEffect(() => {
        setContent(comment.content);
        setIsLike(false)
        setOnReply(false)
        if (comment.likes.find((like) => like._id === auth.user._id)) {
            setIsLike(true);
        }
    }, [comment, auth.user._id]);

    function handleReadMore() {
        setReadMore(!readMore);
    }

    async function handleLike() {
        if (loadLike) return;
        setIsLike(true);

        setLoadLike(true);
        await dispatch(likeComment({ comment, post, auth, socket }));
        setLoadLike(false);
    }

    async function handleUnlike() {
        if (loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        await dispatch(unlikeComment({ comment, post, auth, socket }));
        setLoadLike(false);
    }

    function handleUpdate() {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth, socket }));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    }

    function handleChange(e) {
        setContent(e.target.value);
    }
    function handleCancelEditComment() {
        setOnEdit(false);
    }

    function handleReply() {
        if (onReply) return setOnReply(false);
        setOnReply({ ...comment, commentId });
    }

    return (
        <div className={`comment-post-card ${comment._id ? "" : "disable"}`}>
            <div className="avatar-wrapper">
                <Link to={`/profile/${comment.user._id}`}>
                    <img className='avatar' src={comment.user.avatar} alt='avatar' />
                </Link>
            </div>
            <div className="comment-wrapper">
                <div className={`comment-content ${onEdit ? 'edit' : ''}`}>
                    <Link to={`/profile/${comment.user._id}`}>
                        <h6 className="name">{comment.user.fullname}</h6>
                    </Link>
                    {
                    onEdit 
                    ? (<textarea rows={2} value={content} onChange={handleChange} />)
                    : (
                        <div className="content-wrapper">
                            {comment.tag && comment.tag._id !== comment.user._id && (
                                <Link to={`/profile/${comment.tag._id}`}>{comment.tag.fullname} </Link>
                            )}
                            <span className="content" 
                                style={{filter: theme ? 'invert(1)' : 'invert(0)',
                                 color: theme ? 'var(--light)' : 'var(--dark)'}}>
                                {content.length < 200
                                    ? content
                                    : readMore
                                        ? content + ""
                                        : content.slice(0, 200) + "..."}
                            </span>
                            {content.length > 200 && (
                                <span className="read-more" onClick={handleReadMore}>
                                    {readMore ? "" : "Read more"}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <ul className="bottom-comment">
                    {onEdit ? (
                        <>
                            <li className="update" onClick={handleUpdate}>
                                Update
                            </li>
                            <li className="cancel" onClick={handleCancelEditComment}>
                                Cancel
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="like-comment">
                                <ButtonLike
                                    isLike={isLike}
                                    handleLike={handleLike}
                                    handleUnlike={handleUnlike}
                                />{" "}
                                {comment.likes.length}
                            </li>
                            <li className="reply" onClick={handleReply}>
                                {onReply ? "Cancel" : "Reply"}
                            </li>
                            <li className="date-comment">
                                {moment(comment.createdAt).fromNow()}
                            </li>
                            <li className="comment-menu-wrapper">
                                <CommentMenu
                                    post={post}
                                    comment={comment}
                                    setOnEdit={setOnEdit}
                                />
                            </li>
                        </>
                    )}
                </ul>
                {onReply && (
                    <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                        <Link to={`/profile/${onReply.user._id}`}>{comment.user.fullname}</Link>
                    </InputComment>
                )}
                {children}
            </div>
        </div>
    );
}

export default CommentCard;
