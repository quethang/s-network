import React from "react";

function MessageDisplay({ user }) {
    return (
        <>
            <div className="message-line-avatar-wrapper">
                <img className="message-line-avatar" src={user.avatar} alt="avatar" />
            </div>
            <div className="message-line-content-wrapper">
                <div className="message-line-name-time-wrapper">
                    <span className="message-line-name">Đăng Phạm</span>
                    <i className='fas fa-circle' />
                    <span className="message-line-time">July 1, 2021</span>
                </div>
                <div className="message-line-text-wrapper">
                    <spanc className='message-line-text'>Contràriament a la creença popular, Lorem Ipsum no és només text aleatori. Té les seves arrels en una peça clàssica de la literatura llatina del 45 aC, és a dir, de fa 2000 anys. Richard McClintock, un professor de llatí al Hampden-Sydney College a Virgínia, va buscar una de les paraules més estranyes del llatí, "consectetur", procedent d'un dels paràgrafs de Lorem Ipsum, i anant de citació en citació d'aquesta paraula a la literatura clàssica, en va descobrir l'orígen veritable. Lorem ipsum procedeix de les seccions 1.10.32 i 1.10.33 de "De Finibus Bonorum et Malorum" (Sobre el Bé i el Mal) de Ciceró, escrit l'any 45 aC. Aquest llibre és un tractat sobre la teoria de l'ètica, molt popular durant el Renaixement. La primera línia de Lorem Ipsum, "Lorem ipsum dolor sit amet..", prové d'una línia a la secció 1.10.32.</spanc>
                </div>
            </div>
        </>
    )
}

export default MessageDisplay;