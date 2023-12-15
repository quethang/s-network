import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { checkImage } from '../../utils/imageUpload';
import { updateProfileUser } from "../../redux/actions/profileAction";

function EditProfile({ setOnEdit }) {

    const initState = {
        fullname: '',
        dob: '',
        gender: '',
        address: '',
        description: '',
    }

    const [userData, setUserData] = useState(initState);
    const { fullname, dob, gender, address, description } = userData;

    const [avatar, setAvatar] = useState('');
    const [photoCover, setPhotoCover] = useState('');

    const auth = useSelector(state => state.auth);
    const theme = useSelector(state => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user])

    function handleClose() {
        setOnEdit(false);
    }

    function handleChangeImage(e) {
        const file = e.target.files[0];

        const err = checkImage(file);
        console.log(err);
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })

        if (e.target.name === 'file-avatar') {
            setAvatar(file);
        } else if (e.target.name === 'file-photoCover') {
            setPhotoCover(file);
        }
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateProfileUser({ userData, avatar, photoCover, auth }));
        setOnEdit(false);
    }

    return (
        <div className="overlay">
            <div className={`edit-profile-wrapper ${theme ? 'dark-theme' : ''}`}>
                <form className="edit-profile" onSubmit={handleSubmit}>
                    <div className="header-form">
                        <h2 className="title-form">Edit profile</h2>
                        <div className="icon-wrapper">
                            <div className="icon" onClick={handleClose}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1hjwoze r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-12ym1je">
                                    <g>
                                        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="input-image-wrapper">
                        <div className="header-input">
                            <h3>Avatar</h3>
                            <div className="button-change">
                                <label htmlFor="file-upload-avatar">Change avatar</label>
                            </div>
                            <input
                                type="file"
                                name="file-avatar"
                                id="file-upload-avatar"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </div>
                        <div className="body-input">
                            <img className="image-avatar" src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
                        </div>
                    </div>

                    <div className="input-image-wrapper">
                        <div className="header-input">
                            <h3>Photo cover</h3>
                            <div className="button-change">
                                <label htmlFor="file-upload-photoCover">Change photo cover</label>
                            </div>
                            <input
                                type="file"
                                name="file-photoCover"
                                id="file-upload-photoCover"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </div>
                        <div className="body-input">
                            <img className="image-photo-cover" src={photoCover ? URL.createObjectURL(photoCover) : auth.user.photoCover} alt="photoCover" />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="header-input">
                            <label htmlFor="fullname">Full name</label>
                            <small>{fullname.length}/50</small>
                        </div>
                        <div className="body-input">
                            <input
                                type="text"
                                id="input-fullname"
                                name="fullname"
                                value={fullname}
                                autoComplete="off"
                                maxLength='50'
                                onChange={handleInput}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="header-input">
                            <label htmlFor="dateOfBirth">Date of birth</label>
                        </div>
                        <div className="body-input">
                            <input
                                type="date"
                                id="input-dateOfBirth"
                                name="dob"
                                value={dob}
                                onChange={handleInput}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="header-input">
                            <label htmlFor="gender">Gender</label>
                        </div>
                        <div className="body-input">
                            <select id="input-gender" name="gender" value={gender} onChange={handleInput}>
                                <option value="Male" >Male</option>
                                <option value="Female" >Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="header-input">
                            <label htmlFor="address">Address</label>
                            <small>{address.length}/50</small>
                        </div>
                        <div className="body-input">
                            <input
                                type="text"
                                id="input-address"
                                name="address"
                                value={address}
                                autoComplete="off"
                                maxLength='50'
                                onChange={handleInput}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="header-input">
                            <label htmlFor="description">Description</label>
                            <small>{description.length}/200</small>
                        </div>
                        <div className="body-input">
                            <textarea
                                id="input-description"
                                name="description"
                                value={description}
                                onChange={handleInput}
                                maxLength='200'
                                rows='3'
                            />
                        </div>
                    </div>

                    <div className="button-wrapper">
                        <button className="button button-save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;