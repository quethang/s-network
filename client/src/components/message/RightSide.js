import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import MessageDisplay from './MessageDisplay';

function RightSide() {

    const auth = useSelector(state => state.auth);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const id = useParams().id;
    const [user, setUser] = useState({});
    const [text, setText] = useState('');

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id);
        if (newUser) {
            setUser(newUser);
        }
    }, [message.users, id]);

    function handleChangeTextMesssage(e) {
        setText(e.target.value);
    }

    return (
        <div className="message-right">
            <div className="message-right-header">
                <div className="user-info-wrapper">
                    <div className="avatar-wrapper">
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    <div className="user-info">
                        <h6 className="user-fullname">{user.fullname}</h6>
                        <span></span>
                    </div>
                </div>
                <div className="icon-more-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                        <path d="M13.4258 22C7.66131 22 2.98828 17.5228 2.98828 12C2.98828 6.47715 7.66131 2 13.4258 2C19.1902 2 23.8633 6.47715 23.8633 12C23.8633 17.5228 19.1902 22 13.4258 22ZM13.4258 20C18.0374 20 21.7758 16.4183 21.7758 12C21.7758 7.58172 18.0374 4 13.4258 4C8.8142 4 5.07578 7.58172 5.07578 12C5.07578 16.4183 8.8142 20 13.4258 20ZM12.382 15H14.4695V17H12.382V15ZM12.382 7H14.4695V13H12.382V7Z" fill="#555555" />
                    </svg>
                </div>
            </div>
            <div className="message-right-body">
                <div className="message-right-body-message-box">
                    <div className="message-line receiver-message">
                        <MessageDisplay user={user} />
                    </div>
                    <div className="message-line sender-message">
                        <MessageDisplay user={auth.user} />
                    </div>
                </div>
            </div>
            <div className="message-right-footer">
                <form className="message-form-input">
                    <input
                        type='text'
                        placeholder="Enter your message"
                        value={text}
                        onChange={handleChangeTextMesssage}
                    />
                    <button type="submit" disabled={text ? false : true}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style={{ color: 'rgb(29, 155, 240)' }}>
                            <g>
                                <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z">
                                </path>
                            </g>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RightSide;