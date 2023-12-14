import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Search from './Search';
import Menu from './Menu';
import { getPosts } from '../../redux/actions/postAction';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

function Header(){

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    function handleClick(){
        window.scrollTo({top: 0});
        dispatch(getPosts(auth.token));
        dispatch(getSuggestions(auth.token));
    }

    return (
        <header className={`${theme ? 'dark-theme' : ''}`}>
            <div className="container">
                <div className="logo-wrapper">
                    <Link to="/" className='logo' onClick={handleClick}>
                        <h2>SNetwork</h2>
                    </Link>
                </div>
                
                <Search />
                
                <Menu />
            </div>
        </header>   
    )
}

export default Header;