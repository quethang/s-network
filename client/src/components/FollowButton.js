import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../redux/actions/profileAction';

function FollowButton({user}){
    const [followed, setFollowed] = useState(false);
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(auth.user.followings.find(item => item._id === user._id)){
            setFollowed(true);
        }
    }, [auth.user.followings, user._id]);

    async function handleFollow(){
        if(load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth}));
        setLoad(false);
    }

    async function handleUnfollow(){
        if(load) return;

        setFollowed(false);
        setLoad(true);
        await dispatch(unfollow({ users: profile.users, user, auth}));
        setLoad(false);
    }

    return (
        <>
            {
                followed
                ? <button className='button button-follow followed' onClick={handleUnfollow}>Unfollow</button>
                : <button className='button button-follow' onClick={handleFollow}>Follow</button>
            }
        </>
    )
}

export default FollowButton;