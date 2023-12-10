import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction';
import { getDataAPI } from '../utils/fetchData';
import Loading from '../images/loading.svg';
import { Link } from 'react-router-dom';
import ButtonLoadMore from '../components/ButtonLoadMore';
import LeftNavBar from '../components/LeftNavBar';

function Discover() {
    const auth = useSelector(state => state.auth);
    const discover = useSelector(state => state.discover);
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (!discover.firstLoad) {
            dispatch(getDiscoverPosts(auth.token));
        }
    }, [dispatch, auth.token, discover.firstLoad]);

    async function handelLoadMore() {
        setLoad(true);
        const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token);
        dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
        setLoad(false);
    }

    return (
        <main className={`discover-page ${theme && 'dark-theme'}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2' >
                        <LeftNavBar />
                    </div>
                    <div className='col-lg-8'>
                        {
                            discover.posts.length === 0 ? <h2 className='discover-text-no-post'>No post</h2> : <></>

                        }
                        <div className='discover'>
                            {
                                discover.Loading
                                    ? <img className='loading' src={Loading} alt='loading icon' />
                                    : discover.posts.map((post) => (
                                        <div className={`discover-thumb`} key={post._id}>

                                            <div className='discover-image-thumbnail-wrapper'>
                                                <img className='discover-image-thumbnail' src={post.images[0].url} alt={post.id} />
                                            </div>
                                            <div className='discover-thumb-menu'>
                                                <Link to={`/post/${post._id}`} />
                                                <span><i className='fas fa-heart' />{post.likes.length}</span>
                                                <span><i className='fas fa-comment' />{post.comments.length}</span>
                                            </div>
                                        </div>
                                    ))
                            }

                        </div>
                        {
                            load && <img className='discover-loading' src={Loading} alt='loading icon' />
                        }
                        {
                            !discover.loading &&
                            <ButtonLoadMore result={discover.result} page={discover.page} load={load} handleLoadMore={handelLoadMore} />
                        }
                    </div>
                    <div className='col-lg-1' />
                </div>
            </div>
        </main>
    )
}

export default Discover