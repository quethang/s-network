import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';



function Verify() {
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            const activationEmail = async () => {
                try {
                    const result = await axios.post('api/verify', { email, token })
                    setSuccess(true)
                    console.log(result)
                } catch (err) {
                    err.response.data.msg && setErr(true)
                }
            }
            activationEmail()
        }
    }, [email, token, navigate])


    return (
        <div className="active_page">
            {err && <h1>Err</h1>}
            {success && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh'
                    }}
                    className="verify-wrapper"
                >

                    <h1
                        style={{
                            color: 'green',
                            fontSize: '2rem',
                            textAlign: 'center'
                        }}
                    >
                        Verify email success. Please login to use S-Network
                    </h1>

                    <Link
                        to="/"
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            textDecoration: 'none'
                        }}
                    >
                        Go to Login
                    </Link>

                </div>
            )}
        </div>
    )
}

export default Verify