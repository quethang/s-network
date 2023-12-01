import React, { useState, useEffect } from 'react';

import PostThumb from '../PostThumb';
import Loading from '../../images/loading.svg';
import ButtonLoadMore from '../ButtonLoadMore';
import { getDataAPI } from '../../utils/fetchData';
import { PROFILE_TYPES } from '../../redux/actions/profileAction';

function Posts({ auth, id, dispatch, profile }) {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        profile.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts);
                setResult(data.result);
                setPage(data.page);
            }
        })

    }, [profile.posts, id])

    async function handelLoadMore() {
        setLoad(true);
        const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token);
        const newData = { ...res.data, page: page + 1, _id: id }
        dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData })
        setLoad(false);
    }

    return (
        <section className='profile-page-content'>
            <PostThumb posts={posts} result={result} />

            {
                load && <img className='discover-loading' src={Loading} alt='loading icon' />
            }
            <ButtonLoadMore result={result} page={page} load={load} handleLoadMore={handelLoadMore} />

        </section>


    )
}

export default Posts;