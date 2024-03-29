import React, { useState, useEffect} from "react";
import CommentDispay from "./comments.js/CommentDisplay";

function Comments({post}){
    
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [next, setNext] = useState(2);
    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCmt = post.comments.filter(cmt => !cmt.reply);
        setComments(newCmt);
        setShowComments(newCmt.slice(newCmt.length - next));
    }, [post.comments, next]);

    useEffect(() => {
        const newRep = post.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [post.comments])

    return (
        <div className="comment-post">
            { 
                showComments.map((comment, index) => (
                    <CommentDispay key={index} comment={comment} post={post}
                        replyCm={replyComments.filter(item => item.reply === comment._id)}
                    />
                ))
            }

            {
                comments.length - next > 0
                ? <div className="more-comment" onClick={() => setNext(comments.length)}>See more comments</div>
                : comments.length > 2 && <div className="more-comment" onClick={() => setNext(2)}>See less comments</div>
            }
        </div>
    )
}

export default Comments;