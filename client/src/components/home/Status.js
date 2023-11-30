import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='status-wrapper'>
        <div className="status">
            <div className="avatar-user">
                <Link to={`profile/${auth.user._id}`}>
                    <img className='avatar' src={auth.user.avatar} alt='avatar'/>
                </Link>
            </div>
            <div className='question-status-wrapper' onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                <h6 className='question-status'>What’s on your mind, {auth.user.fullname}?</h6>
            </div>
        </div>
    </div>
)
};

export default Status;
