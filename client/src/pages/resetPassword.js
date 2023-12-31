import React, { useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import tickImage from '../images/tick.png';

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const { token } = useParams()

    const { password, cf_password, err, success } = data
    const navigate = useNavigate();

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }


    const handleResetPass = async () => {
        if (password.length < 6)
            return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })

        if (password !== cf_password)
            return setData({ ...data, err: "Password did not match.", success: '' })

        try {
            const res = await axios.post('/api/reset', { password }, {
                headers: { Authorization: token }
            })


            return setData({ ...data, err: "", success: res.data.msg })

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }

    }


    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                {
                    !success && (
                        <div>
                            {err && <h1 style={{ color: 'red', fontSize: '24px' }}>{err}</h1>}
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={password}
                                onChange={handleChangeInput} />

                            <label htmlFor="cf_password">Confirm Password</label>
                            <input type="password" name="cf_password" id="cf_password" value={cf_password}
                                onChange={handleChangeInput} />

                            <button onClick={handleResetPass}>Reset Password</button>
                        </div>
                    )
                }
                {
                    success && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h1 style={{ color: 'green', fontSize: '24px', marginBottom: '20px' }}>{success}</h1>
                            <img width="300" height="300" src={tickImage} alt="tick" style={{ marginBottom: '20px' }} />
                            <Link
                                to="/"
                                style={{
                                    display: 'block',
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    marginBottom: '20px',
                                }}
                            >
                                Go to Homepage
                            </Link>
                        </div>
                    )
                }
                {/* {err && <h1 style={{ color: 'red', fontSize: '24px' }}>{err}</h1>}
                {success && (
                    <div>
                        <h1 style={{ color: 'green', fontSize: '24px' }}>{success}</h1>
                        <Link to="/">Go to Homepage</Link>
                    </div>

                )}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />

                <label htmlFor="cf_password">Confirm Password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                    onChange={handleChangeInput} />

                <button onClick={handleResetPass}>Reset Password</button> */}


            </div>
        </div>
    )
}

export default ResetPassword