import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import LoadIcon from '../../images/loading.svg'
import PostCard from '../../components/PostCard'

const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])

    const auth = useSelector(state => state.auth);
    const detailPost = useSelector(state => state.detailPost);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({ detailPost, id, auth }))

        if (detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    }, [detailPost, dispatch, id, auth])

    return (
        <main className='detail-post'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2'>

                    </div>
                    <div className='col-lg-8'>
                        {
                            post.length === 0 &&
                            <img className='image-loading' src={LoadIcon} alt="loading" />
                        }

                        {
                            post.map(item => (
                                <PostCard key={item._id} post={item} />
                            ))
                        }
                    </div>
                    <div className='col-lg-2'>

                    </div>
                </div>
            </div>

        </main>

    )
}

export default Post