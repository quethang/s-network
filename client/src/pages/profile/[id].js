import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved'

import { getProfileUsers } from '../../redux/actions/profileAction';
import Loading from '../../images/loading.svg';

function Profile() {

    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    const dispatch = useDispatch()

    const { id } = useParams()
    const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    return (
        <main className='profile-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2'>

                    </div>
                    <div className='col-lg-8'>
                        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
                        {
                            auth.user._id === id &&
                            <section className='profile-page-tab-bar-wrapper'>
                                <div className='profile-page-tab-bar'>
                                    <div className={`tab ${saveTab ? '' : 'active'}`} onClick={() => setSaveTab(false)}>
                                        <h6 className='title-tab'>Posts</h6>
                                    </div>

                                    <div className={`tab ${saveTab ? 'active' : ''}`} onClick={() => setSaveTab(true)}>
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
                    <div className='col-lg-2'>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile;