import React, { useContext,useState } from 'react';
import { Context } from './context/Context';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import organic from './images/organic.png';
import order from './images/order.webp';
import packing from './images/packing.png';
import ship from './images/ship.png';
import 'react-toastify/dist/ReactToastify.css';
const Welcome = () => {
    const [show, setShow] = useState(false);
    const { products, addItem } = useContext(Context);
    console.log(products);

    const add = (id) => {
        addItem(id);
    };
    const notify=()=>toast("Wow so easy!");

    return (
        
        <main>
            <section className="carousel">
                <div className="container-fluid p-0">
                    <div
                        className="carousel slide"
                        id="withControl"
                        data-ride="carousel"
                        data-interval="2000"
                    >
                        <div className="carousel-inner car">
                            <div className="carousel-item active">
                                <img
                                    className="d-block w-100"
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                    alt="carousel-1"
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    className="d-block w-100"
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                    alt="carousel-2"
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    className="d-block w-100"
                                    src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                    alt="carousel-3"
                                />
                            </div>
                        </div>
                        <a
                            href="#withControl"
                            className="carousel-control-prev"
                            data-slide="prev"
                        >
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a
                            href="#withControl"
                            className="carousel-control-next"
                            data-slide="next"
                        >
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mt-5 p-3 text-center">
                    <h1 className="text-uppercase">
                        More than <span className="text-warning">20,000 dishes </span>to
            order!
          </h1>
                    <p className="font-weight-bold text-secondary">
                        Welcome to The Biggest Network of Food Ordering & Delivery
          </p>
                </div>
            </section>
            
            <section id="products">

                <div className="container text-center">
               
                    <div className="row align-items-center justify-content-center p-3 my-2">
                        {products.map((product) => (
                            <div className="col-md-6 col-lg-3 rounded my-2" key={product._id}>
                                <div className="card" key={product._id}>
                                    <Link to={`/details/${product._id}`}>
                                        <img
                                            src={`http://localhost:5000/${product.files[0].filename}`}
                                            width='245px'
                                            height='245px'
                                            alt={product.files[0].filename}
                                            className="card-img-top"
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`details/${product._id}`} style={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}>
                                            <h3 className="card-title text-uppercase font-weight-bold">{product.Foodname}</h3>
                                        </Link>
                                        <h6 className="text-muted">Quantity: {product.Quantity}</h6>
                                        <p className="card-text text-muted">Published on: {product.Date}</p>
                                        <button
                                            className="btn btn-warning text-uppercase rounded-pill"
                                            onClick={() => add(product._id)}
                                        >
                                            <i className="fas fa-shopping-cart">&nbsp;Order</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="customer">
                <div className="container text-center my-5">
                    <h2 className="font-weight-bold py-2">Why customer choose us</h2>
                    <p className="text-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit hic rem
                            perspiciatis totam corporis quasi vero! Laboriosam, distinctio ea.</p>
                    <div className="row align-items-center my-5 py-3">
                        <div className="col-sm-6 col-md-3">
                            <img src={organic} width="100px" alt="organic" className="img-fluid" />
                            <h4 className="mt-1">Natural Food</h4>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <img src={packing} width="100px" alt="organic" className="img-fluid" />
                            <h4 className="mt-1">Handy Packing</h4>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <img src={ship} width="100px" alt="organic" className="img-fluid" />
                            <h4 className="mt-4">Free Shipping</h4>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <img src={order} width="100px" alt="organic" className="img-fluid" />
                            <h4 className="mt-4">Easy order</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-warning text-center" id="subscribe">
                <div className="container-fluid p-5">
                    <h1 className="font-weight-bold text-white">Get Our Weekly Email:</h1>
                    <form className="form-inline justify-content-center my-3">
                        <input type="email" name="email" id="email" placeholder="Enter Your Address"
                            className="form-control-lg text-white rounded-pill" />
                        <button className="btn btn-lg btn-light rounded-pill ml-3 px-4 mt-2 mt-md-0">SUBMIT</button>
                    </form>
                </div>
            </section>

        </main>
    );
};

export default Welcome;
