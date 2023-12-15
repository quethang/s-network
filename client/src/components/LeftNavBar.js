import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import IconHome from '../icon/IconHome';
import IconDiscover from '../icon/IconDiscover';
import IconMessages from '../icon/IconMessages';
import IconSaved from '../icon/IconSaved';
import IconProfile from '../icon/IconProfile';

function LeftNavBar() {

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);
    const location = useLocation();
    const isMessagePage = location.pathname.includes('/message');
    const [viewHeight, setViewHeight] = useState(false);

    const leftNavBar = [
        { link: '/', icon: <IconHome />, name: 'Home' },
        { link: '/discover', icon: <IconDiscover />, name: 'Discover' },
        { link: '/message', icon: <IconMessages />, name: 'Messages' },
        { link: '/profile/', icon: <IconSaved />, name: 'Saved' },
        { link: `/profile/${auth.user._id}`, icon: <IconProfile />, name: 'Profile' },
    ];

    useEffect(() => {
        if(isMessagePage) setViewHeight(true);
    }, [isMessagePage])

    return (
        <aside className={`left-nav-bar ${theme && 'dark-theme'}`} style={{height: `${viewHeight && '100vh'}`}}>
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
        </aside>
    )

}

export default LeftNavBar;