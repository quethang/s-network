import React from "react";
import UserCard from '../UserCard';
import FollowButton from "../FollowButton";
import { useSelector } from "react-redux";

function Followings({users, setShowFollowings}){

    const auth = useSelector(state => state.auth);

    function handleClose(){
        setShowFollowings(false);
    }

    return (
            <div className="dialog-follow-wrapper overlay">
                <div className="dialog-follow">
                    <div className="header-dialog">
                        <h2 className="title-dialog">Followings</h2>
                        <div className="icon-wrapper">
                            <div className="icon" onClick={handleClose}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1hjwoze r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-12ym1je">
                                    <g>
                                        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="body-dialog">
                        <ul className="list-user">
                            {
                                users.map((user, index) => (
                                    <UserCard key={index} user={user} setShowFollowings={setShowFollowings}>
                                        {
                                            auth.user._id !== user._id && <FollowButton user={user}/>
                                        }
                                    </UserCard>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default Followings;