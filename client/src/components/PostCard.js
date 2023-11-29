import React from 'react';

import PostHeader from './home/post_Card/PostHeader';
import PostBody from './home/post_Card/PostBody';
import PostFooter from './home/post_Card/PostFooter';
import InputComment from './home/InputComment';
import Comments from './home/Comment';

function PostCard({post}) {

    return (
        <div className='post'>
            <PostHeader post={post} />
            <PostBody post={post} />
            <PostFooter post={post} />
            <Comments post={post}/>
            <InputComment post={post}/>
        </div>
    )
}

export default PostCard;