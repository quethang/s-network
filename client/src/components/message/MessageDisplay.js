import React from "react";

function MessageDisplay({ user, msg, theme }) {
    return (
        <>
            <div className="message-line-avatar-wrapper">
                <img className="message-line-avatar" src={user.avatar} alt="avatar" />
            </div>
            <div className="message-line-content-wrapper">
                <div className="message-line-name-time-wrapper">
                    <span className="message-line-name">{user.fullname}</span>
                    <i className='fas fa-circle' />
                    <span className="message-line-time">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                {
                    msg.text &&
                    <div className="message-line-text-wrapper">
                        <span className='message-line-text'>{msg.text}</span>
                    </div>
                }
                {
                    msg.media.map((item, index) => (
                        <div key={index} className="message-line-media-wrapper">
                            {
                                item.url.match(/video/i)
                                ? <video controls src={item.url} alt="video" />
                                : <img src={item.url} alt="thumbnail" />
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MessageDisplay;