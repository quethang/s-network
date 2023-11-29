import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import "../../styles/status_modal.css";

const Status = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='status-wrapper'>
        <div className="status">
            <div className="avatar-user">
                <Link to={`profile/${auth.user._id}`}>
                    <Avatar src={auth.user.avatar} size='big-avatar'/>
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
