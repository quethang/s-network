import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from '../../Slider';

function PostBody({ post }) {

    const [readMore, setReadMore] = useState(false);
    const theme = useSelector(state => state.theme);
    function handelReadMore() {
        setReadMore(!readMore);
    }

    return (
        <div className="body-post">
            <div className="content-post">
                <span style={{filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'var(--light)' : 'var(--dark)'}}>
                    {
                        post.content.length < 200
                            ? post.content
                            : readMore ? post.content + '' : post.content.slice(0, 200) + '...'
                    }
                </span>
                {
                    post.content.length > 200 &&
                    <span className="read-more" onClick={handelReadMore}>{readMore ? '' : 'Read more'}</span>
                }
            </div>
            {
                post.images.length > 0 && <Slider images={post.images} id={post._id} />
            }

        </div>
    )
}

export default PostBody;