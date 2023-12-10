import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserCard from '../UserCard';
import FollowButon from '../FollowButton';
import Loading from '../../images/loading.svg';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

function RightSideBar() {

    const auth = useSelector(state => state.auth);
    const suggestions = useSelector(state => state.suggestions);
    const dispatch = useDispatch();

    function handleReload(){
        dispatch(getSuggestions(auth.token))
    }

    return (
        <aside className='right-side-bar'>
            <div className='right-side-bar-top-wrapper'>
                <h5 className='title'>Suggested follow-up</h5>
                {
                    !suggestions.loading &&
                    (
                        <div className='icon-reload-wrapper' onClick={handleReload}>
                            <i className='fas fa-redo' />
                        </div>
                    )
                }
            </div>
            
            <div className='right-side-bar-body-wrapper'>
                {
                    
                    suggestions.Loading
                    ? <img src={Loading} alt='loading' className='loading' />
                    :   (
                            <ul className='list-suggestions'>
                                {
                                    suggestions.users.map(user => (
                                        <UserCard key={user._id} user={user}>
                                            <FollowButon user={user}/>
                                        </UserCard>
                                    ))
                                }
                            </ul>
                        )
                }
            </div>
        </aside>
    )
}

export default RightSideBar;