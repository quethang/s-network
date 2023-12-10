import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

function CommentDispay({ comment, post, replyCm }) {
    const [showRep, setShowRep] = useState([]);
    const [next, setNext] = useState(1);

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next));
    }, [replyCm, next]);

    return (
        <div className='comment-post-display'>
            <CommentCard comment={comment} post={post} commentId={comment._id}>
                <div className="reply-comment-wrapper">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                key={index}
                                comment={item}
                                post={post}
                                commentId={comment._id}
                            />
                        ))
                    }
                    {
                        replyCm.length - next > 0
                        ? <div className="more-comment" onClick={() => setNext(next + 10)}> See more comments...</div>
                        : replyCm.length > 1 && <div className="more-comment" onClick={() => setNext(1)}>Hide comments...</div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDispay;