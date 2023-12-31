import React from "react";

function Toast({ msg, handleShow, bgColor }) {
    return (
        <div className={`toast-notify ${bgColor}`}>
            <div className="toast-notify-icon">
                {
                    msg.title === 'Success'
                        ? <i className="fas fa-check-circle" />
                        : <i className="fa-solid fa-triangle-exclamation" />
                }
            </div>

            <div className="toast-notify-body">
                <h6 className="toast-notify-title">{msg.title}</h6>
                <span className="toast-notify-content">{msg.body}</span>
            </div>

            <div className="toast-notify-button-close" data-dismiss='toast' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                </svg>
            </div>

        </div>
    )
}

export default Toast;