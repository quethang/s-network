import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostCard from '../PostCard';
import Loading from '../../images/loading.svg';
import ButtonLoadMore from '../ButtonLoadMore';
import { getDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = () => {
  const auth = useSelector(state => state.auth);
  const homePost = useSelector(state => state.homePost);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  async function handelLoadMore() {
    setLoad(true);
    const res = await getDataAPI(`posts?limit=${homePost.page * 9}`, auth.token);
    dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePost.page + 1 } });
    setLoad(false);
  }
  return (
    <div className='post-wrapper'>
      {
        homePost.posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
      }
      {
        load && <img className='discover-loading' src={Loading} alt='loading icon' />
      }
      <ButtonLoadMore result={homePost.result} page={homePost.page} load={load} handleLoadMore={handelLoadMore} />

    </div>
  )
};

export default Posts;
