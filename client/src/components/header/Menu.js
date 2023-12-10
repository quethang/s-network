import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { NOTIFY_TYPES } from '../../redux/actions/notifyAction';
import { logout } from '../../redux/actions/authAction';
import NotifyModal from '../NotifyModal';

function Menu() {

    const navLink = [
        { icon: 'home', path: '/' },
        { icon: 'near_me', path: '/message' },
        { icon: 'explore', path: '/discover' },
    ];

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);
    const notify = useSelector(state => state.notify)

    const dispatch = useDispatch();

    const pathName = useLocation().pathname;

    function isActive(pn) {
        if (pn === pathName) {
            return 'active';
        }
        return '';
    }

    function handleDarkMode() {
        dispatch({
            type: GLOBALTYPES.THEME,
            payload: !theme
        });
    }

    function handleSound(){
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <nav className="top-menu-wrapper">
            {
                navLink.map((link, index) => (
                    <div key={index} className={`item-top-menu-wrapper ${isActive(link.path)}`}>
                        <Link className='item-link' to={link.path} />
                        <div className='item'>
                            <span className='material-icons'>
                                {link.icon}
                            </span>
                        </div>
                    </div>
                ))
            }

            <div className="item-top-menu-wrapper dropdown">
                <span className='showdropdown' data-toggle="dropdown" />
                <div className='item'>
                    <span className='material-icons'>notifications</span>
                </div>
                <div className={`dot ${notify.data.length > 0 && 'active'}`}>
                    <span>{notify.data.length}</span>
                </div>
                <div className='dropdown-menu'>
                    <NotifyModal />
                </div>
            </div>

            <div className="item-top-menu-wrapper dropdown">
                <span className='showdropdown' data-toggle="dropdown" />
                <img className='avatar' src={auth.user.avatar} alt='avatar' />

                <div className='dropdown-menu'>
                    <div className='dropdown-item'>
                        <Link to={`profile/${auth.user._id}`} />
                        <img src={auth.user.avatar} alt={auth.user.avatar} />
                        <h6>{auth.user.fullname}</h6>
                    </div>

                    <div className='dropdown-item' onClick={handleDarkMode}>
                        <div className='dropdown-item-icon-wrapper'>
                            <i className="fa-solid fa-moon" />
                        </div>
                        <h6>{theme ? 'Light theme' : 'Dark theme'}</h6>
                    </div>

                    <div className='dropdown-item' onClick={handleSound}>
                        <div className='dropdown-item-icon-wrapper'>
                            {
                                notify.sound
                                ? <i className="fa-solid fa-volume-high"/>
                                : <i className="fa-solid fa-volume-off"/>
                            }
                        </div>
                        <h6>{notify.sound ? 'Sound on' : 'Sound off'}</h6>
                    </div>

                    <div className='dropdown-item'>
                        <Link to='/' onClick={handleLogout} />
                        <div className='dropdown-item-icon-wrapper'>
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                        </div>
                        <h6>Log out</h6>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu;