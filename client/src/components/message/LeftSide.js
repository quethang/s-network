import React, { useState, useEffect, useRef } from "react";
import UserCard from '../UserCard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataAPI } from '../../utils/fetchData';
import { addUser, getConversations } from '../../redux/actions/messageAction';

function LeftSide() {

    const auth = useSelector(state => state.auth);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUser] = useState([]);
    const nagigate = useNavigate();
    const id = useParams().id;
    const pageEnd = useRef()
    const [page, setPage] = useState(0)

    useEffect(() => {
        if(message.firstLoad) return;
        dispatch(getConversations({auth}));
    }, [dispatch, auth, message.firstLoad]);

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

    //Load more
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setPage])

    useEffect(() =>{
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
            dispatch(getConversations({auth, page}))
        }
    }, [message.resultUsers, page, auth, dispatch])

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
                <div className="message-left-body-chat-list">
                    {
                        searchUsers.length !== 0
                            ? <>
                                {
                                    searchUsers.map((user, index) => (
                                        <div className={`message-left-body-chat-item ${isAtive(user)}`} key={index}
                                            onClick={() => handleAddChat(user)}>
                                            <UserCard user={user} />
                                        </div>
                                    ))
                                }
                            </>
                            : <>
                                {
                                    message.users.map((user, index) => (
                                        <div className={`message-left-body-chat-item ${isAtive(user)}`} key={index} 
                                            onClick={() => handleAddChat(user)}>
                                            <UserCard user={user} msg={true}>
                                                <i className={`fas fa-circle`} />
                                            </UserCard>
                                        </div>
                                    ))
                                }
                            </>
                    }
                </div>
                <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
            </div>
        </div>
    )
}

export default LeftSide;