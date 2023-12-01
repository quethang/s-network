import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonLike from "../../ButtonLike";

import { likePost, unlikePost } from '../../../redux/actions/postAction';
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

function PostFooter({ post }) {

    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [isShare, setIsShare] = useState(false)

    const {auth, theme} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setIsLike(true);    
        }
    }, [post.likes, auth.user._id]);

    async function handleLike(){
        if(loadLike) return;
        setIsLike(true);
        
        setLoadLike(true);
        await dispatch(likePost({post, auth}));
        setLoadLike(false);
    }

    async function handleUnlike(){
        if(loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        await dispatch(unlikePost({post, auth}));
        setLoadLike(false);
    }

    return (
        <div className="footer-post">
            <div className="action-bar-post">
                
                <ButtonLike 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                />

                <div className="button action-button">
                    <Link to={`/post/${post._id}`} />
                    <i className="far fa-comment"></i>
                </div>
                
                <div className="button action-button">
                    <i className="far fa-bookmark"></i>
                </div>

                <div className="button action-button" onClick={() => setIsShare(!isShare)}>
                    <i className="fa-solid fa-share"></i>
                </div>
            </div>
            <div className="info-post">
                <span className="like">{`${post.likes.length} ${post.likes.length > 1 ? 'likes' : 'like'}`}</span>
                <span className="comment">{`${post.comments.length} ${post.comments.length > 1 ? 'comments' : 'comment'}`}</span>
            </div>
            {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}></ShareModal>
            }
        </div>
    )
}

export default PostFooter;