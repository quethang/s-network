import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { GLOBALTYPES } from './../redux/actions/globalTypes';
import IconHome from '../icon/IconHome';
import IconDiscover from '../icon/IconDiscover';
import IconMessenger from '../icon/IconMessenger';
import IconNotification from '../icon/IconNotification';
import IconSaved from '../icon/IconSaved';

function LeftNavBar() {

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    function handleClick() {
        dispatch({type: GLOBALTYPES.THEME, payload: !theme});
    }

    return (
        <aside className='left-nav-bar'>
            <ul className='left-nav-bar-list-page'>
                <li className='left-nav-bar-item-page'>
                    <Link to='/' />
                    <div className='icon-wrapper'>
                        <IconHome />
                    </div>
                    <div className='name-wrapper'>
                        <h5>Home</h5>
                    </div>
                </li>
                <li className='left-nav-bar-item-page'>
                    <Link to='/discover' />
                    <div className='icon-wrapper'>
                        <IconDiscover />
                    </div>
                    <div className='name-wrapper'>
                        <h5>Discover</h5>
                    </div>
                </li>
                <li className='left-nav-bar-item-page'>
                    <Link to='/messenger' />
                    <div className='icon-wrapper'>
                        <IconMessenger />
                    </div>
                    <div className='name-wrapper'>
                        <h5>Messenger</h5>
                    </div>
                </li>
                <li className='left-nav-bar-item-page'>
                    <Link to='/notification' />
                    <div className='icon-wrapper'>
                        <IconNotification />
                    </div>
                    <div className='name-wrapper'>
                        <h5>Notification</h5>
                    </div>
                </li>
                <li className='left-nav-bar-item-page'>
                    <Link to='/saved' />
                    <div className='icon-wrapper'>
                        <IconSaved />
                    </div>
                    <div className='name-wrapper'>
                        <h5>Saved</h5>
                    </div>
                </li>
            </ul>
            <div className='switch-theme-container'>
                <div className='text-wrapper'>
                    <span className='text'>Theme:</span>
                </div>
                <div class="switch-container">
                    <input type="checkbox" hidden="hidden" id="username" />
                    <label class="switch" for="username" onClick={handleClick}></label>
                </div>
            </div>
        </aside>
    )

}

export default LeftNavBar;