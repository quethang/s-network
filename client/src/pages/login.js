import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';

function Login(){
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const [userData, setUserData] = useState({email: '', password: ''});
    const eye = useRef(null);
    const inputPassRef = useRef(null);

    const {email, password} = userData;
    
    const dispatch = useDispatch();

    //Điều hướng trang 
    useEffect(() => {
        if(auth.token) navigate("/");
    }, [auth.token, navigate]);

    function handleChangeInput(e){
        const {name, value} = e.target; 
        setUserData({
            ...userData,
            [name]: value
        });
    }

    //show - hide password
    function handleShowPass(){
        eye.current.classList.toggle("fa-eye");
        eye.current.classList.toggle("fa-eye-slash");

        if(inputPassRef.current.getAttribute("type") === "password"){
            inputPassRef.current.setAttribute("type", "text");
        } else if (inputPassRef.current.getAttribute("type") === "text"){
            inputPassRef.current.setAttribute("type", "password");
        }
    }

    //submit
    function handleSubmit(e){
        e.preventDefault();
        dispatch(login(userData));
        setUserData({email: '', password: ''});
    }

    return (
        <main className="login">
            <section className="container">
                <div className="box-login">
                    <h3 className="title">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label>Email</label>
                            <input 
                                className="input-username" 
                                name="email" 
                                type="text" 
                                autoComplete="off"
                                value={email}
                                onChange={handleChangeInput}
                            />
                            {/* <small className="text-error">Please enter your email to login.</small> */}
                        </div>
                        <div className="input-wrapper">
                            <label>Password</label>
                            <input 
                                className="input-password" 
                                name="password" 
                                type="password" 
                                autoComplete="off" 
                                onChange={handleChangeInput}
                                value={password}
                                ref={inputPassRef}
                            />
                            {/* <small className="text-error">notify.error</small> */}
                            <i 
                                className="fa fa-eye"
                                ref={eye}
                                onClick={handleShowPass}
                            ></i>
                        </div>
                        <p className="guide-fg-pass"><Link to="/forgot-password">Forgot password</Link></p>
                        <button 
                            className="button button-login" 
                            type="submit"
                            disabled={email && password ? false : true}
                        >
                            Log In
                        </button>
                    </form>
                    <p className="guide-dont-have-acc">Don't have an account? <Link to='/register'>Register now</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Login;