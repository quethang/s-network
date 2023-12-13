import React from 'react';
import { useSelector } from 'react-redux';

import LeftNavBar from '../../components/LeftNavBar';
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';

function Conversation() {
    const theme = useSelector(state => state.theme);
    return (
        <main className={`message-page ${theme && 'dark-theme'}`}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <LeftNavBar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='message'>
                            <LeftSide />
                            <RightSide />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Conversation;