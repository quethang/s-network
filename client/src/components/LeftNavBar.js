import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import IconHome from '../icon/IconHome';
import IconDiscover from '../icon/IconDiscover';
import IconMessages from '../icon/IconMessages';
import IconNotification from '../icon/IconNotification';
import IconProfile from '../icon/IconProfile';
import { GLOBALTYPES } from '../redux/actions/globalTypes';

function LeftNavBar() {

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);
    const location = useLocation();
    const isMessagePage = location.pathname.includes('/message');
    const [viewHeight, setViewHeight] = useState(false);
    const refToggleButton = useRef(null);
    const dispatch = useDispatch();

    const leftNavBar = [
        { link: '/', icon: <IconHome />, name: 'Home' },
        { link: '/discover', icon: <IconDiscover />, name: 'Discover' },
        { link: '/message', icon: <IconMessages />, name: 'Messages' },
        { link: '/notify', icon: <IconNotification />, name: 'Notification' },
        { link: `/profile/${auth.user._id}`, icon: <IconProfile />, name: 'Profile' },
    ];

    useEffect(() => {
        if (isMessagePage) setViewHeight(true);
    }, [isMessagePage])

    function handleChangeTheme(e) {
        dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
    }

    return (
        <aside className={`left-nav-bar ${theme && 'dark-theme'}`} style={{ height: `${viewHeight && '100vh'}` }}>
            <ul className='left-nav-bar-list-page'>
                {
                    leftNavBar.map((item, index) => (
                        <li className='left-nav-bar-item-page' key={index}>
                            <Link to={`${item.link}`} />
                            <div className='icon-wrapper'>
                                {item.icon}
                            </div>
                            <div className='name-wrapper'>
                                <h5>{item.name}</h5>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className='container-toggle-button-theme'>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--dark)' }}>Dark</span>
                <div className='toggle-button-theme' style={{ position: 'relative', top: '4px' }}>
                    <label className="switch" style={{ cursor: 'pointer' }}>
                        <input type="checkbox" checked={theme ? true : false} onChange={handleChangeTheme} />
                        <div></div>
                    </label>
                </div>
            </div>
        </aside>
    )

}

export default LeftNavBar;