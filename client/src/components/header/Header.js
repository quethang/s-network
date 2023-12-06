import React from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';
import Menu from './Menu';

function Header(){

    function handleClick(){
        window.scrollTo({top: 0});
    }

    return (
        <header>
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