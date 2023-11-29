import React, { useState } from "react";
import Slider from '../../Slider';

function PostBody({ post }) {

    const [readMore, setReadMore] = useState(false);

    function handelReadMore() {
        setReadMore(!readMore);
    }

    return (
        <div className="body-post">
            <div className="content-post">
                <span>
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