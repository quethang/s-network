import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved'

import { PROFILE_TYPES, getProfileUsers } from '../../redux/actions/profileAction';
import Loading from '../../images/loading.svg';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

function Profile({saved}) {

    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        } else{
            getDataAPI(`/user_posts/${id}`, auth.token)
            .then(res => {
                dispatch({
                    type: PROFILE_TYPES.GET_POSTS,
                    payload: { ...res.data, _id: id, page: 2 }
                })
            })
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    }, [id, auth, dispatch, profile.ids])

    useEffect(() => {
        if(saved){
            setSaveTab(true);
        }
    }, [saved])

    function handleClickPostsTab (){
        setSaveTab(false);
        // dispatch(getProfileUsers({ id, auth }))
        getDataAPI(`/user_posts/${id}`, auth.token)
            .then(res => {
                dispatch({
                    type: PROFILE_TYPES.GET_POSTS,
                    payload: { ...res.data, _id: id, page: 2 }
                })
            })
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
    }
    function handleClickSavedTab (){
        setSaveTab(true);
    }

    return (
        <main className={`profile-page ${theme && 'dark-theme'}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2' />
                    <div className='col-lg-8'>
                        <Info auth={auth} profile={profile} theme={theme} dispatch={dispatch} id={id} />
                        {
                            auth.user._id === id &&
                            <section className='profile-page-tab-bar-wrapper'>
                                <div className='profile-page-tab-bar'>
                                    <div className={`tab ${saveTab ? '' : 'active'}`} onClick={handleClickPostsTab}>
                                        <h6 className='title-tab'>Posts</h6>
                                    </div>

                                    <div className={`tab ${saveTab ? 'active' : ''}`} onClick={handleClickSavedTab}>
                                        <h6 className='title-tab'>Saved</h6>
                                    </div>
                                </div>
                            </section>
                        }
                        {
                            profile.loading
                                ? <img className='profile-page-loading-post' src={Loading} alt='loading' />
                                : <>
                                    {
                                        saveTab
                                        ? <Saved auth={auth} dispatch={dispatch}/>
                                        : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                                    }
                                </>
                        }

                    </div>
                    <div className='col-lg-2' />
                </div>
            </div>
        </main>
    )
}

export default Profile;