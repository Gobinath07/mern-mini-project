import React,{useState} from 'react'
import './notification.css'

import {handleSubmit} from '../../Main/auth/Login';






export const showErrMsg = (msg) => {

  return <div className="errMsg">{msg}</div>
  
  
 
  
    

}
export const showSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}</div>

}
