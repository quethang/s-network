import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { logout } from '../../redux/actions/authAction';

import Avatar from '../Avatar';

function Menu(){

    const navLink = [
        {label: 'Home', icon: 'home', path: '/'},
        {label: 'Message', icon: 'near_me', path: '/message'},
        {label: 'Discover', icon: 'explore', path: '/discover'},
        {label: 'Notify', icon: 'notifications', path: '/notify'},
    ];

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);

    const dispatch = useDispatch();
        
    const dropdown = useRef(null);

    const pathName = useLocation().pathname;

    function isActive(pn){
        if(pn === pathName){
            return 'active';
        }
    }

    function handleShow(){
        dropdown.current.classList.toggle('show');
    }

    function handleDarkMode(){
        
        dispatch({
            type: GLOBALTYPES.THEME,
            payload: !theme
        });
    }

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <nav className="top-menu-wrapper">
            {
                navLink.map((link, index) => (
                    <div key={index} className={`item-top-menu-wrapper ${isActive(link.path)}`}>
                        <Link className='item-link' to={link.path}></Link>
                        <div className='item'>
                            <span className='material-icons'>
                                {link.icon}
                            </span>
                        </div>
                        <div className="dot"></div>
                    </div>
                ))
            }
                    
            <div className="item-top-menu-wrapper submenu" onClick={handleShow}>
                <Avatar src={auth.user.avatar} size='medium-avatar'/>
                
                <div className='dropdown-submenu' ref={dropdown}>
                    <Link className='item-submenu' to={`profile/${auth.user._id}`}>Profile</Link>
                    <label className='item-submenu' onClick={handleDarkMode}>{theme ? 'Light theme' : 'Dark theme'}</label>
                    <Link 
                        className='item-submenu' 
                        to='/' 
                        onClick={handleLogout}
                    >
                        Log out
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Menu;