import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'

function Posts({ auth, id, dispatch, profile }) {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)
    // const [page, setPage] = useState(0)
    // const [load, setLoad] = useState(false)

    useEffect(() => {
        profile.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts)
                setResult(data.result)
                // setPage(data.page)
            }
        })

    }, [profile.posts, id])

    return (
        <div>
            <PostThumb posts={posts} result={result}></PostThumb>
        </div>


    )
}

export default Posts;