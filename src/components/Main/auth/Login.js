import React,{useState,useContext} from 'react'
import { Context } from '../../context/Context'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import '../../utlis/notification/notification.css'
import {useDispatch} from 'react-redux'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import {dispatchLogin} from '../../../redux/actions/authAction'
import {showErrMsg,showSuccessMsg} from '../../utlis/notification/Notification'
const initialState ={
    email:'',
    password:'',
    err:'',
    success:''
}

export default function Login() {
    
const { setName } = useContext(Context)
const [name,settName]=useState('')
const [user,setUser]=useState(initialState)
const dispatch = useDispatch()
const history = useHistory()
    const {email,password,err,success}=user
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value,err:'',success:''})
    }

    const handleSubmit = async e=>{
        e.preventDefault()

        try{
        const res=await axios.post('http://localhost:5000/user/login',{email,password})
        // settName(res.data.user.name)
        //  setName(res.data.user.name)
        setUser({...user, err: '', success: res.data.msg})
        localStorage.setItem('firstLogin', true)
        localStorage.setItem('username', res.data.user.name)
        dispatch(dispatchLogin())
         history.push("/")
        toast.success("Login Successfully !!",{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,});
      


        
        }
        catch(err){
            console.log('err',err)
            err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
        }
    

    }
    
       
   
    console.log(name)
    return (

        <div className="login_page">

            <h2>Login</h2>
           
            
            {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}


            <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="email">Email</label>
                   <input type="text" placeholder="Enter email address" id="email"
                   value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit" className="newone btn btn-primary mx-auto"  >Login</button>

                    <Link to="/forgot_password">Forgot your password?</Link>
                    
                </div>
   
             </form>
             <p>New Customer? <Link to="/register">Register</Link></p>
            
        </div>
    )
}
