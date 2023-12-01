import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'

import Info  from '../../components/profile/Info';
import Posts  from '../../components/profile/Posts';

import { getProfileUsers } from '../../redux/actions/profileAction';
import Loading from '../../images/loading.svg';

function Profile(){

    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <main className='profile-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2'>

                    </div>
                    <div className='col-lg-8'>
                        <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
                        {
                            profile.loading
                            ? <img className='loading' src={Loading} alt='loading'/>
                            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}/>
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