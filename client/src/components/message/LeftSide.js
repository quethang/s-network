import React, { useState } from "react";
import UserCard from '../UserCard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataAPI } from '../../utils/fetchData';
import { addUser } from '../../redux/actions/messageAction';

function LeftSide() {

    const auth = useSelector(state => state.auth);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUser] = useState([]);
    const nagigate = useNavigate();
    const id = useParams().id;

    function handleChangeSearch(e) {
        setSearch(e.target.value);
    }

    async function handleSearch(e) {
        e.preventDefault();
        if (!search) {
            return setSearchUser([]);
        }

        try {
            const res = await getDataAPI(`search?fullname=${search}`, auth.token)
            setSearchUser(res.data.users);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            })
        }
    }

    function handleAddChat(user) {
        setSearch('');
        setSearchUser([]);
        dispatch(addUser({ user, message }));
        return nagigate(`/message/${user._id}`);
    }

    function isAtive(user){
        if(id === user._id){
            return 'active';
        }
        return;
    }

    return (
        <div className="message-left">
            <div className="message-left-header">
                <div className="text-wrapper">
                    <h6>Message</h6>
                </div>
                <form className="search-form" onSubmit={handleSearch}>
                    <input type="text" value={search} placeholder="Enter to search" onChange={handleChangeSearch} />
                    <button type="submit"></button>
                </form>
            </div>
            <div className="message-left-body">
                <ul className="message-left-body-chat-list">
                    {
                        searchUsers.length !== 0
                            ? <>
                                {
                                    searchUsers.map((user, index) => (
                                        <li className={`message-left-body-chat-item ${isAtive(user)}`} key={index}
                                            onClick={() => handleAddChat(user)}>
                                            <UserCard user={user} />
                                        </li>
                                    ))
                                }
                            </>
                            : <>
                                {
                                    message.users.map((user, index) => (
                                        <li className={`message-left-body-chat-item ${isAtive(user)}`} key={index} 
                                            onClick={() => handleAddChat(user)}>
                                            <UserCard user={user} >
                                                <i className={`fas fa-circle`} />
                                            </UserCard>
                                        </li>
                                    ))
                                }
                            </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default LeftSide;