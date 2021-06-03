import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
// import {showErrMsg, showSuccessMsg} from '../../utlis/notification/Notification'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('http://localhost:5000/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail() 
        }
    },[activation_token])

    return (
        <div className="container">
        <div className="active_pagees center">
<div class="card text-center">
  <div class="card-header">
    Welcome {localStorage.getItem('username')}
  </div>
  <div class="card-body">
    <h5 class="card-title">{err? err : success}</h5>
    <p class="card-text">-----------------------------------------</p>
    <a href="/Login" class="btn btn-primary">Login Now</a>
  </div>
  <div class="card-footer text-muted">
    Try To Not Waste Food
  </div>
</div>
</div>


    </div>
        // <div className="active_page">
        //     {err && showErrMsg(err)}
        //     {success && showSuccessMsg(success)}
        // </div>
    )
}

export default ActivationEmail