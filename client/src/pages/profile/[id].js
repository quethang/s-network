import React, {useEffect} from 'react';

import Info  from '../../components/profile/Info';
import Posts  from '../../components/profile/Posts';

import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../images/loading.svg';
import '../../styles/profile.css';
import { getProfileUsers } from '../../redux/actions/profileAction';
import {useParams} from 'react-router-dom'


function Profile(){

    const {profile, auth} = useSelector(state => state);
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <main className='profile-page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-10'>
                        {
                            profile.loading
                            ? <img className='loading' src={Loading} alt='loading'/>
                            : <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
                        }
                        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}/>
                    </div>
                    <div className='col-lg-1'>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile;