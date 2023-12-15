import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

import MessageDisplay from './MessageDisplay';
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { loadMoreMessages, addMessage, getMessages, deleteConversation } from "../../redux/actions/messageAction";
import { imageUpload } from '../../utils/imageUpload';
import Loading from '../../images/loading.svg';

function RightSide() {

    const auth = useSelector(state => state.auth);
    const message = useSelector(state => state.message);
    const theme = useSelector(state => state.theme);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const id = useParams().id;
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');
    const [showListReactions, setShowListReactions] = useState(false);
    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(9);
    const [isLoadMore, setIsLoadMore] = useState(0);
    const refDisplay = useRef();
    const pageEnd = useRef();
    const navigate = useNavigate();
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

    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if(newData){
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    },[message.data, id])

    useEffect(() => {
        if(id && message.users.length > 0){
            setTimeout(() => {
                refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            },50)

            const newUser = message.users.find(user => user._id === id)
            if(newUser) setUser(newUser)
        }
    }, [message.users, id]);
    
    useEffect(() => {
        const getMessagesData = async () => {
            if(message.data.every(item => item._id !== id)){
                await dispatch(getMessages({auth, id}))
                setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },50)
            }
        }
        getMessagesData()
    },[id, dispatch, auth, message.data])

    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setIsLoadMore(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setIsLoadMore])

    useEffect(() => {
        if(isLoadMore > 1){
            if(result >= page * 9){
                dispatch(loadMoreMessages({auth, id, page: page + 1}))
                setIsLoadMore(1)
            }
        }
        // eslint-disable-next-line
    },[isLoadMore])

    function handleChangeTextMesssage(e) {
        setText(e.target.value);
    }

    function handleShowListReactions() {
        setShowListReactions(!showListReactions);
    }

    function handleAddIcon(icon) {
        setText(text + icon);
    }

    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newMedia = [];

        files.forEach((file) => {
            if (!file) return (err = "File does not exist.");

            if (file.size > 1024 * 1024 * 5) {
                return (err = "The image/video largest is 5mb.");
            }
            return newMedia.push(file);
        });

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setMedia([...media, ...newMedia]);
    };

    function handleDeleteMedia(index) {
        const newArr = [...media];
        newArr.splice(index, 1)
        setMedia(newArr);
    }

    async function handleSubmitMessage(e) {
        e.preventDefault();
        if (!text.trim() && media.length === 0) {
            return;
        }
        setText('');
        setMedia([]);
        setLoadMedia(true);
        let arr = [];
        if (media.length > 0) {
            arr = await imageUpload(media);
        }
        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: arr,
            createdAt: new Date().toISOString()
        }
        setLoadMedia(false);
        await dispatch(addMessage({ msg, auth, socket }));
        if(refDisplay.current){
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})

        }
    }

    function handleDeleteConversation() {
        if(window.confirm('Do you want delete this conversation?')){
            dispatch(deleteConversation({auth, id}));
            return navigate('/message');
        }
    }

    return (
        <div className="message-right">
            {
                user.length !== 0 &&
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
                    <div className="icon-more-wrapper dropdown">
                        <div className="icon-more" data-toggle="dropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                <path d="M13.4258 22C7.66131 22 2.98828 17.5228 2.98828 12C2.98828 6.47715 7.66131 2 13.4258 2C19.1902 2 23.8633 6.47715 23.8633 12C23.8633 17.5228 19.1902 22 13.4258 22ZM13.4258 20C18.0374 20 21.7758 16.4183 21.7758 12C21.7758 7.58172 18.0374 4 13.4258 4C8.8142 4 5.07578 7.58172 5.07578 12C5.07578 16.4183 8.8142 20 13.4258 20ZM12.382 15H14.4695V17H12.382V15ZM12.382 7H14.4695V13H12.382V7Z" fill="#555555" />
                            </svg>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={handleDeleteConversation}>
                                <span>Delete Conversation</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="message-right-body">
                <div className="message-right-body-message-box" >
                <div ref={refDisplay}>
                <button style={{marginTop: '-25px', opacity: 0}} ref={pageEnd}>Load more</button>
                {
                        data.map((msg, index) => (
                            <div key={index}>
                                {
                                    msg.sender !== auth.user._id &&
                                    <div className="message-line receiver-message">
                                        <MessageDisplay user={user} msg={msg} theme={theme}/>
                                    </div>
                                }
                                {
                                    msg.sender === auth.user._id &&
                                    <div className="message-line sender-message">
                                        <MessageDisplay user={auth.user} msg={msg} theme={theme}/>
                                    </div>
                                }
                            </div>
                        ))
                    }
                    {
                        loadMedia && 
                        <div className="message-line sender-message">
                            <img className="loading-message" src={Loading} alt="loading" />
                        </div>
                    }
                </div>
                    
                </div>
            </div>
            <div className="message-right-footer">
                <ul className="message-form-list-media">
                    {
                        media.map((item, index) => (
                            <li className="message-form-item-media" key={index}>
                                {
                                    item.type.match(/video/i)
                                        ? <video src={URL.createObjectURL(item)} alt="thumbnail" autoPlay muted loop />
                                        : <img src={URL.createObjectURL(item)} alt="thumbnail" />
                                }
                                <div className="icon-minus-wrapper" onClick={() => handleDeleteMedia(index)}>
                                    <i className="fa-solid fa-minus" />
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <form className="message-form-input" onSubmit={handleSubmitMessage}>
                    <div className="message-form-button">
                        <label className="icon-wrapper" onClick={handleShowListReactions}>
                            <i className="far fa-smile" />
                        </label>
                        <ul className={`list-reactions ${showListReactions && 'show'}`}>
                            {
                                reactions.map((icon, index) => (
                                    <li key={index} onClick={() => handleAddIcon(icon)}>
                                        {icon}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="message-form-button">
                        <label className="icon-wrapper" htmlFor="message-form-file" >
                            <i className="fa-solid fa-image icon" />
                        </label>
                        <input
                            type="file"
                            name="message-form-file"
                            id="message-form-file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleChangeMedia}
                        />
                    </div>
                    <input
                        type='text'
                        placeholder="Enter your message"
                        value={text}
                        onChange={handleChangeTextMesssage}
                    />
                    <button type="submit" disabled={(text || media.length > 0) ? false : true}>
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