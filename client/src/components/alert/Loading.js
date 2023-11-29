import React from 'react';

import '../../styles/loading.css';
function Loading(){

    return (
        <div className='loading'>
            <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" >
                <circle cx="50" cy="50" r="32" strokeWidth="2" stroke="#1d9bf0" strokeDasharray="50.26548245743669 50.26548245743669" 
                        fill="none" strokeLinecap="round" transform="matrix(1,0,0,1,0,0)" />
            </svg>
        </div>
    )
}

export default Loading;