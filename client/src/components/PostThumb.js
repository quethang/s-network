import React from 'react'
import { Link } from 'react-router-dom'

const PostThumb = ({ posts, result }) => {
    if(result === 0){
        return (<h2 className='text-no-post'>No post</h2>);   
    }

    return (
        <div className='profile-page-post-thumb-wrapper'>
            {
                posts.map((post, index) => (
                    <div className={`profile-page-post-thumb`} key={index}>
                        <Link to={`/post/${post._id}`}/>
                        <div className='image-thumbnail-wrapper'>
                            <img className='image-thumbnail' src={post.images[0].url} alt={post.id} />
                        </div>
                        <div className='profile-page-post-thumb-menu'>
                            <span><i className='far fa-heart'/>{post.likes.length}</span>
                            <span><i className='far fa-comment' />{post.comments.length}</span>
                        </div>
                    </div>
                ))
            }
        </div>
        // <div className="post_thumb">
        //     {
        //         posts.map(post => (
        //             <Link key={post._id} to={`/post/${post._id}`}>
        //                 <div className="post_thumb_display">
        //                     {post.images[0] ? (
        //                         <img
        //                             src={post.images[0].url}
        //                             alt={post.images[0].url}
        //                             style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        //                         />
        //                     ) : (
        //                         ''
        //                     )}
        //                     <div className="post_thumb_menu">
        //                         <i className="far fa-heart">{post.likes.length}</i>
        //                         <i className="far fa-comment">{post.comments.length}</i>
        //                     </div>
        //                 </div>
        //             </Link>
        //         ))
        //     }
        // </div>
    )
}

export default PostThumb