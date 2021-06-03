import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
import ActivationEmail from './auth/ActivationEmail'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import NotFound from '../utlis/notfound/notfound'
import {useSelector} from 'react-redux'




function Main(){
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return(
        <section>
            
            <Switch>
            <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
           
               
            </Switch>
        </section>
    )
}

export default Main 