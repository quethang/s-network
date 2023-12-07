import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../redux/actions/authAction';

function Register(){
    const auth = useSelector( state => state.auth);
    const alert = useSelector( state => state.alert);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userData, setUserData] = useState({fullName: '', email: '', password: '', cfPassword: ''});

    const [showPass, setShowPass] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);

    const {fullName, email, password, cfPassword} = userData;

    useEffect(() => {
        if(auth.token) navigate("/");
    }, [auth.token, navigate]);

    function handleChangeInput(e){
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    function handleShowPass(){
        setShowPass(!showPass);
    }
    function handleShowPassCf(){
        setShowPassConfirm(!showPassConfirm);
    }
     
    //submit
    function handleSubmit(e){
        e.preventDefault();
        dispatch(register(userData));
    }

    return (
        <main className="register">
            <section className="container">
                <div className="box-register">
                    {/* <div className='logo-wrapper'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="r-1nao33i r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                </path>
                            </g>
                        </svg>
                    </div> */}
                    <h3 className="title">Sign up</h3>
                    <form method="POST" action="" onSubmit={handleSubmit}>
                        <div className={alert.fullName ? 'input-wrapper error' : 'input-wrapper'}>
                            <label>Full name</label>
                            <input 
                                className="input-fullname" 
                                name="fullName" 
                                type="text" 
                                autoComplete="off" 
                                value={fullName}
                                onChange={handleChangeInput}
                            />
                            <small className="text-error">{alert.fullName ? alert.fullName : ''}</small>
                        </div>
                        <div className={alert.email ? 'input-wrapper error' : 'input-wrapper'}>
                            <label>Email</label>
                            <input 
                                className="input-email" 
                                name="email" 
                                type="text" 
                                autoComplete="off"
                                value={email}
                                onChange={handleChangeInput}
                            />
                            <small className="text-error">{alert.email ? alert.email : ''}</small>
                        </div>
                        <div className={alert.password ? 'input-wrapper error' : 'input-wrapper'}>
                            <label>Password</label>
                            <input 
                                className="input-password" 
                                name="password" 
                                type={showPass ? 'text' : 'password'} 
                                autoComplete="off"
                                value={password}
                                onChange={handleChangeInput}
                            />
                            <i 
                                className={showPass ? 'fa fa-eye-slash' : 'fa fa-eye'} 
                                onClick={handleShowPass}
                            ></i>
                            <small className="text-error">{alert.password ? alert.password : ''}</small>
                        </div>
                        <div className={alert.cfPassword ? 'input-wrapper error' : 'input-wrapper'}>
                            <label>Confirm password</label>
                            <input 
                                className="input-password" 
                                name="cfPassword" 
                                type={showPassConfirm ? 'text' : 'password'} 
                                autoComplete="off"
                                value={cfPassword}
                                onChange={handleChangeInput}
                            />
                            <i 
                                className={showPassConfirm ? 'fa fa-eye-slash' : 'fa fa-eye'} 
                                onClick={handleShowPassCf}
                            ></i>
                            <small className="text-error">{alert.cfPassword ? alert.cfPassword : ''}</small>
                        </div>
                        <button 
                            className="button button-register" 
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                    <p className='guide-have-acc'>Do you already have an account? <Link to="/">Login now</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Register;