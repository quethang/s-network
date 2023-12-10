import React from 'react';

import LeftNavBar from '../../components/LeftNavBar';
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';

function Conversation() {
    return (
        <main className='message-page'>
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