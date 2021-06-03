import React, { useContext, useState, useEffect } from 'react'
import { Context } from './context/Context'
import {useSelector} from 'react-redux'
import axios from 'axios'
import first from './images/first.png'
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Navbar = () => {

    
    const retrievedUsername = localStorage.getItem('username');
    const { cart,name,alertclass } = useContext(Context)
    const [scrolled, setScrolled] = useState(false)
    let localCart = localStorage.getItem('carts')
    localCart = JSON.parse(localCart)
    console.log(localCart);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth

console.log(user);
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/user/logout')
            localStorage.removeItem('firstLogin')
            localStorage.removeItem('username')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
    const notify=()=>{
        toast.info("Login First !",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,});   
    }
    // console.log(`${localCart.length == null ? 0:localCart.length}`)
    return (
        <div>
            <div id="social-media">
                <ul className="d-flex flex-column p-0">
                    <li className="p-2 my-1 text-center bg-warning">
                      <Link to="/cart" className="cart-item text-white ">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-len-aside bg-white font-weight-bold">{localCart != null && localCart.length > 0 ? localCart.length : 0}</span>
                        </Link>
                    
                    </li>
                    <li className="p-2 my-1 text-center bg-warning">
                        <a href="#" className="text-white">
                            <i className="fas fa-images "></i>
                        </a>
                    </li>
                    <li className="p-2 my-1 text-center bg-warning">
                        <a href="https://wa.me//919500336848" className="text-white">
                            <i className="fab fa-whatsapp fa-1x"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="top d-flex justify-content-around">
                <div className="call mr-5 d-none d-md-block text-warning">
                    Call us for Ordering - <span className="text-dark"> 094 711 80 58</span>
                </div>
                <div className="login ml-5">
                    {isLogged?'':<a href="/register" className="text-muted text-decoration-none" >Register</a>}
                    
                </div>
            </div>
            <nav className={`mynav navbar navbar-expand-lg navbar-light ${scrolled ? 'sticky' : ''} bg-white px-2 py-1`}>
                <Link to="/" className="navbar-brand brand text-warning font-weight-bold display-1 ml-5">
                    <img src={first} alt="sevai" width="50px"/>
                </Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#mainNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse list justify-content-end mr-5" id="mainNav">
                    <ul className="navbar-nav" id="navlist">
                        <li className="navbar-item mx-3 text-uppercase">
                            <Link to="/" className="nav-link">Home
                    </Link>
                        </li>
                        <span className="align-self-center d-none d-lg-inline">|</span>
                        <li className="navbar-item mx-3 text-uppercase">
                            <a href="#" className="nav-link">About Us</a>
                        </li>
                        <span className="align-self-center d-none d-lg-inline">|</span>
                        <li className="navbar-item mx-3 text-uppercase">
                            <a href="#" className="nav-link">Our Products</a>
                        </li>
                        <span className="align-self-center d-none d-lg-inline">|</span>
                        <li className="nav-item mx-3 text-uppercase">
                        <Link to="/cart" className="nav-link cart-item ">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="cart-len bg-warning">{localCart != null && localCart.length > 0 ? localCart.length : 0}</span>
                            </Link>
                            {/* <Link to="/cart" className="nav-link cart-item ">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="cart-len bg-warning">{localCart != null && localCart.length > 0 ? localCart.length : 0}</span>
                            </Link> */}
                        </li>
                        <span className="align-self-center d-none d-lg-inline">|</span>
                        { isLogged
                        ?<li className="navbar-item mx-3 text-uppercase">
                        <Link to="/post" className="nav-link">
                            <i className="fas fa-camera"></i>
                    Post
                </Link>
                    </li>
                    :<li className="navbar-item mx-3 text-uppercase">
                    <Link to="/login" className="nav-link" onClick={notify}>
                        <i className="fas fa-camera"></i>
                Post
            </Link>
                </li> }
                        
                        <span className="align-self-center d-none d-lg-inline">|</span>
                        
                            {/* {
                            isLogged 
                            ?  <li className=" nav-item dropdown mx-3 text-uppercase">
                            <a  className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                {name==''?'Login':name}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">My Posts</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a>
                        </div></li>
                            :
                            <li className=" nav-item dropdown mx-3 text-uppercase"> <a href="/login" className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            {name==''?'Login':name}
                        </a></li>
                        } */}
{retrievedUsername?<li className=" nav-item dropdown mx-3 text-uppercase">
<a className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">
{retrievedUsername}
</a>
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Profile</a>
    <a className="dropdown-item" href="#">My Posts</a>
    <a className="dropdown-item" href="#">Settings</a>
    <a className="dropdown-item"  onClick={handleLogout}>Logout</a>
</div>
</li>:<li className=" nav-item dropdown mx-3 text-uppercase"> <a href="/login" className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Login
                        </a></li>}

                    </ul>
                </div>
                {/* {alertclass=='alert'?(
                <div class="alert alert-warning alert-dismissible fade show w-50 p-0 text-center align-items-center" role="alert">
                    <h5 className="font-weight-bold">Already Added</h5>
                    <button type="button" class="close p-0 mr-3 mt-1" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            ):null} */}
            </nav>
        </div>
    )
}


export default Navbar



/*<li className=" nav-item dropdown mx-3 text-uppercase">
<a className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">
    Login
</a>
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Profile</a>
    <a className="dropdown-item" href="#">My Posts</a>
    <a className="dropdown-item" href="#">Settings</a>
    <Link to="/" onClick={handleLogout}>Logout</Link>
</div>
</li>*/


