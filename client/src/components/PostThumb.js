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
                            {
                                post.images[0].url.match(/video/i)
                                ? <video className='image-thumbnail' src={post.images[0].url} alt={post.id} />
                                : <img className='image-thumbnail' src={post.images[0].url} alt={post.id} />
                            }
                        </div>
                        <div className='profile-page-post-thumb-menu'>
                            <span><i className='far fa-heart'/>{post.likes.length}</span>
                            <span><i className='far fa-comment' />{post.comments.length}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostThumb