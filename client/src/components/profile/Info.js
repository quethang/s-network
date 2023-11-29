import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import EditProfile from './EditProfile';
import FollowButton from '../FollowButton';
import Avatar from '../Avatar';
import Followers from './Followers';
import Followings from './Followings';
import '../../styles/info.css';

function Info({id, auth, profile, dispatch}){

    // const id = useParams().id;
    
    // const auth = useSelector(state => state.auth);
    // const profile = useSelector(state => state.profile);
    
    // const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    const [onEdit, setOnEdit] = useState(false);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowings, setShowFollowings] = useState(false);

    function handleShowFollowers(){
        setShowFollowers(true);
    }

    function handleShowFollowings(){
        setShowFollowings(true);
    }

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user]);
        } else{
            // dispatch(getProfileUsers({users: profile.users, id, auth}));
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    function handelEnableEdit(){
        setOnEdit(true);
    }
    return (
        <section className='info'>
            {
                userData.map(user => (
                    <div className='info-user-container' key={user._id}>
                        <div className='photoCover-wrapper'>
                            <Link to={``}>
                                {user.photoCover ? <img className='photoCover' src={user.photoCover} alt='photoCover'/> : <div></div>}
                            </Link>
                        </div>
                        <div className='info-user-wrapper'>
                            <div className='avatar-container'>
                                <div className='avatar-wrapper'>
                                    <Avatar src={user.avatar} size='huge-avatar'/>
                                </div>
                                <div className='button-wrapper'>
                                    {
                                        user._id === auth.user._id
                                        ? <button className='button button-edit-profile' onClick={handelEnableEdit}>Edit profile</button>
                                        : <FollowButton user={user}/>
                                    }
                                </div>
                            </div>
                            <div className='detail-container'>
                                <div className='name-wrapper'>
                                    <h5 className='name-user'>{user.fullname}</h5>
                                    <h6 className='email-user'>{user.email}</h6>
                                </div>
                                <div className='follow-wrapper'>
                                    <span className='follow' onClick={handleShowFollowings}>
                                        <span className='number-follow'>{user.followings.length}</span> Following
                                    </span>
                                    <span className='follow' onClick={handleShowFollowers}>
                                        <span className='number-follow'>{user.followers.length}</span> Follower
                                        </span>
                                </div>
                            </div>
                        </div>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit}/>
                        }
                        {
                            showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers}/>
                        }
                        {
                            showFollowings && <Followings users={user.followings} setShowFollowings={setShowFollowings}/>
                        }
                        
                    </div>
                ))
            }
        </section>
    )
}

export default Info;