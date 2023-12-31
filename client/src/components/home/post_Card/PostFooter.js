import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonLike from "../../ButtonLike";

import { likePost, unlikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

function PostFooter({ post }) {

    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [isShare, setIsShare] = useState(false)
    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const auth= useSelector(state => state.auth);
    const theme = useSelector(state => state.theme)
    const socket = useSelector(state => state.socket);
    

    const dispatch = useDispatch();

    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        }else{
            setIsLike(false)
        }
    }, [post.likes, auth.user._id]);

    async function handleLike() {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    }

    async function handleUnlike() {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(unlikePost({ post, auth, socket }));
        setLoadLike(false);
    }

    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true);
        }else{
            setSaved(false)
        }
    }, [auth.user.saved, post._id]);


    async function handleSavePost() {
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({post, auth}));
        setSaveLoad(false);
    }

    async function handleUnSavePost() {
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({post, auth}));
        setSaveLoad(false);
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

                {
                    saved
                    ?   (
                            <div className="button action-button" onClick={handleUnSavePost}>
                                <i className="fas fa-bookmark" ></i> 
                            </div>
                        )
                    :   (
                        <div className="button action-button" onClick={handleSavePost}>
                            <i className="far fa-bookmark" ></i>
                        </div>
                        )
                }

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