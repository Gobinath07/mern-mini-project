import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utlis/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utlis/validate/validate'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import '../../utlis/notification/notification.css'
const initialState = {
    name: '',
    email: '',
    phone:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
function Register() {
    const history = useHistory();
    const [user, setUser] = useState(initialState)

    const {name, email,phone, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('http://localhost:5000/user/register', {
                name, email,phone, password
            })

            setUser({...user, err: '', success: res.data.msg})
            history.push('/Login')
            toast.success("Register Successfully Check Mail for Activation !!",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,});
          
    
    
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
 
            {success && showSuccessMsg(success)}

           
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="number">phone no</label>
                    <input type="phone" placeholder="Enter phone number" id="phone"
                    value={phone} name="phone" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit" className="btn btn-primary mx-auto" to='/login' >Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register