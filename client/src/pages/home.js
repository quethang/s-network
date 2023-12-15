import React, {useEffect} from "react";
import { useSelector } from 'react-redux';

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import Loading from '../images/loading.svg';
import RightSideBar from '../components/home/RightSideBar';
import LeftNavBar from '../components/LeftNavBar';

let scroll = 0;
function Home() {
    const theme = useSelector(state => state.theme);
    const homePost = useSelector(state => state.homePost);


    window.addEventListener('scroll', () => {
        if(window.location.pathname === '/'){
            scroll = window.scrollY 
            return scroll;
        }
    })
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)
    }, [])
    
    return (
        <main className={`home-page ${theme ?  'dark-theme' : ''}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <LeftNavBar />
                    </div>
                    <section className='col-lg-7'>
                        <div className='home-page-post-wrapper'>
                            <Status />
                            {
                                homePost.loading
                                    ? <img src={Loading} alt='loading' className='loading' />
                                    : (homePost.result === 0 && homePost.posts.length === 0)
                                        ? <h2 className='home-page-text-no-posts'>No Post</h2>
                                        : <Posts />
                            }
                        </div>
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
