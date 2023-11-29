import React from 'react';
import { useSelector } from 'react-redux';

function ButtonLike({ isLike, handleLike, handleUnlike }) {

    const theme = useSelector(state => state.theme);
    
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