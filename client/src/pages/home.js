import React from "react";
import { useSelector } from 'react-redux';

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import Loading from '../images/loading.svg';
import RightSideBar from '../components/home/RightSideBar';

function Home() {
  const homePost = useSelector(state => state.homePost);
  // 
  return (
    <main className='home-page'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3'>

          </div>
          <section className='col-lg-6'>
            <Status />
            {
              homePost.loading
                ? <img src={Loading} alt='loading' className='loading-home' />
                : (homePost.result === 0 && homePost.posts.length === 0)
                  ? <h2 className='text-no-posts'>No Post</h2>
                  : <Posts />
            }
          </section>
          <div className='col-lg-3'>
            <RightSideBar />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
