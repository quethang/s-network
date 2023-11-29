import React from 'react';

import '../styles/avatar.css'

function Avatar({src, size}){
    return (
        <img src={src} alt="avatar" className={`avatar ${size}`}/>
    )
}

export default Avatar;