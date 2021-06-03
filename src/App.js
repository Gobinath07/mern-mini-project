import React,{useEffect} from 'react'
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Provider from './components/context/Context'
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Post from './components/Post';
import Details from './components/Details';
import './App.css';
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';
import DataProvider from './redux/store'

import {dispatchLogin,fetchUser,dispatchGetUser} from './redux/actions/authAction';
import Header from './components/header/Header'
import 'react-toastify/dist/ReactToastify.css';
import register from './components/Main/auth/Register'
import login from './components/Main/auth/Login'
import ActivationEmail from './components/Main/auth/ActivationEmail'
import ForgotPassword from './components/Main/auth/ForgotPassword'
import ResetPassword from './components/Main/auth/ResetPassword'
import Main from './components/Main/main'
import NotFound from './components/utlis/notfound/notfound'
toast.configure()
function App() {
 

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('http://localhost:5000/user/refresh_token',null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

  return (
    
      
      <Provider>
      
        <Router>
        
        <div className="App">
       
          <Navbar />
          
        
      <Main/>
          <Switch>
      
               
          
            <Route exact path='/' component={Welcome} />
            <Route exact path='/post' component={Post} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/details/:id' component={Details} />
          
          </Switch>
          <Footer />
          </div>
        </Router >
      
      </Provider>
    

  );
}

export default App;
