import React from 'react';

function ButtonLike({ isLike, handleLike, handleUnlike }) {
    
    return (
        <>
            {
                isLike
                ? <button className="button action-button" onClick={handleUnlike}><i className="fas fa-heart"/></button>
                : <button className="button action-button" onClick={handleLike} ><i className="far fa-heart"/></button>
            }
           
        </>

    )
}

export default ButtonLike;