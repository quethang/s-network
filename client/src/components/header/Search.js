import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import UserCard from '../UserCard';

import loading from '../../images/loading.svg';

function Search(){

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const  auth = useSelector(state => state.auth);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();

    const ic_close = useRef(null);
    const ic_search = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();

        if (!search) return;
        
        try{
            setLoad(true);
            const res = await getDataAPI(`search?fullname=${search}`, auth.token)
            setUsers(res.data.users);
            setLoad(false);
        } catch (err){
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    useEffect(() => {
        if(!search){
            ic_search.current.style.display = 'block';
            ic_close.current.style.display = 'none';
        } else {
            ic_search.current.style.display = 'none';
            ic_close.current.style.display = 'block';
        }
    }, [search])

    function handleChange(e){
        setSearch(e.target.value.trim());
    }

    function handleClose(){
        setSearch('');
        setUsers([]);
    }
    return (
        <div className='search-form-wrapper'>
            <form className='search-form' onSubmit={handleSubmit}>
                <input 
                    id='input-search'
                    type='text'  
                    name='search'
                    placeholder='Search'
                    autoComplete='off'
                    value={search}
                    onChange={handleChange}
                />
                <div className='icon-wrapper' onClick={handleClose}>
                    <svg  ref={ic_close} viewBox="0 0 24 24" aria-hidden="true" className="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1hjwoze r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-12ym1je">
                        <g>
                            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                            </path>
                        </g>
                    </svg>
                    <svg ref={ic_search} xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <circle cx="11.2485" cy="10.7888" r="8.03854" stroke="black" strokeWidth="1.5" strokeLinecap="square"/>
                        <path d="M16.7373 16.7083L21.2908 21.2499" stroke="black" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                </div>
                <button type='submit'>Search</button>

                { load && <img className='loading' src={loading} alt='loading' />}

                <ul className='list-search-users'>
                    {
                        search && users.map(user => (
                            <UserCard 
                                key={ user._id } 
                                user={user}
                                handleClose={handleClose}
                            />
                        ))
                    }
                </ul>
            </form>
        </div>
    )
}

export default Search;