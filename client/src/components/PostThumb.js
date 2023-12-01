import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostThumb = ({ posts, result }) => {
    const theme = useSelector(state => state.theme);

    if(result === 0){
        return (<h2 className='text-no-post'>No post</h2>);   
    }

    const imageDefault = 'https://res.cloudinary.com/dndmyqnme/image/upload/v1701277563/depositphotos_318221368-stock-illustration-missing-picture-page-for-website_fvezsz.jpg';

    return (
        <div className='profile-page-post-thumb-wrapper'>
            {
                posts.map((post, index) => (
                    <div className={`profile-page-post-thumb ${theme ? 'theme-dark' : ''}`} key={index}>
                        <Link to={`/post/${post._id}`}/>
                        <div className='image-thumbnail-wrapper'>
                            <img className='image-thumbnail' src={post.images.length > 0 ? post.images[0].url : imageDefault} alt={post.id} />
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