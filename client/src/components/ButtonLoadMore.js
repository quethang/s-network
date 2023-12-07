import React from 'react';

function ButtonLoadMore({result, page, load, handleLoadMore}){
    return (
        <>
            {
                result < 9 * (page - 1) 
                ? '' 
                : !load && <button className='button-load-more' onClick={handleLoadMore}><i className="fas fa-redo"/></button>
            }
        </>
    )
}

export default ButtonLoadMore;