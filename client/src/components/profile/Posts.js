import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'

function Posts({ auth, id, dispatch, profile }) {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)

    useEffect(() => {
        profile.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts)
                setResult(data.result)
            }
        })

    }, [profile.posts, id])

    return (
        <section className='profile-page-content'>
            <PostThumb posts={posts} result={result}></PostThumb>
        </section>


    )
}

export default Posts;