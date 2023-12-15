import React, {useState} from 'react'
import axios from 'axios'

import '../styles/forgotPassword.css'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function isEmail(email){
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'This email is not in the correct format.', success: ''})            
        try {
            const res = await axios.post('/api/forgot_password', {email})
            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="fg_pass">
            <h2>Forgot Your Password?</h2>

            <div className="row">
                {err && <h1 style={{ color: 'red', fontSize: '24px' }}>{err}</h1>}
                {success && <h1 style={{ color: 'green', fontSize: '24px' }}>{success}</h1>}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email}
                onChange={handleChangeInput} />
                <button onClick={forgotPassword}>Verify your email</button>
            </div>
        </div>
    )
}

export default ForgotPassword
 