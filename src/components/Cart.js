import React, { useContext, useEffect } from 'react'
import { Context } from './context/Context'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Cart = () => {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const { cart, getTotal, total, removeItem } = useContext(Context)
    let localCart = localStorage.getItem('carts')
    localCart = localCart = JSON.parse(localCart)
    console.log('cart', localCart);

    useEffect(() => {
        getTotal()
    }, [])

   
    return (
        <>
            { localCart != null && localCart.length > 0 ? (
                <div className="mb-4">
                    <section>
                        <div className="container-fluid bg-secondary d-flex align-items-center justify-content-center" id="cartPage_intro">
                            <h1 className="text-uppercase text-white">Cart</h1>
                        </div>
                    </section>

                    <section>
                        <div className="container mt-5">
                            <div className="row">
                                <aside className="col-lg-9 border p-3">
                                    {
                                        localCart != null && localCart.length > 0 ?
                                            (
                                                localCart.map(product => (
                                                    <div className="row my-3 bg-light py-2">
                                                        <div className="col-12 d-flex justify-content-around align-items-center">
                                                            <div className="img rounded">
                                                                <img src={`http://localhost:5000/${product.files[0].filename}`}
                                                                    width="70px" className="rounded" alt="" />
                                                            </div>
                                                            <div className="name">
                                                                <h4 className="text-uppercase font-weight-bold">{product.Foodname}</h4>
                                                            </div>
                                                            <div className="price">
                                                                <h5 className="text-grey">$20.00</h5>
                                                            </div>
                                                            <div className="cancel">
                                                                <i onClick={() => removeItem(product._id)} className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                )
                                            )
                                            : null
                                    }
                                </aside>
                                <aside className="col-lg-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row p-1">
                                                <div className="col-6">Total Price:</div>
                                                <div className="col-6 text-strike">$0.00</div>
                                            </div>
                                            <hr />
                                            <div className="row p-1">
                                                <div className="col-6">Shipping:
                                            <br />
                                                    <span>
                                                        {localCart != null && localCart.length > 0 ? `${localCart.length} X 10.00` : ''}
                                                    </span>
                                                </div>
                                                <div className="col-6">$
                                                {localCart != null && localCart.length > 0 ? `${localCart.length} X 10.00` : 0}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row p-1">
                                                <div className="col-6">Total:</div>
                                                <div className="col-6">${total}.</div>
                                            </div>
                                            <hr />
                                            {isLogged?
                                            <button className="btn btn-warning btn-block" onClick={(e) => {
                                                   e.preventDefault();
                                                    window.location.href='https://rzp.io/l/S6QHQkcFI';
                                                    }}>Checkout</button>:<button className="btn btn-warning btn-block" onClick={(e) => {
                                                        toast.warning("Login First !",{
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,});
                                                       
                                                         }}>Checkout</button>}
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>

                </div>
            )
                :
                (
                    <div>
                        <section>
                            <div className="container-fluid bg-secondary d-flex align-items-center justify-content-center" id="cartPage_intro">
                                <h1 className="text-uppercase text-white">Cart</h1>
                            </div>
                        </section>
                        <div className="Container text-center m-5 p-5">
                            <h1 className="text-warning text-uppercase font-weight-bold">Nothing to show</h1>
                            <Link to="/" className="btn btn-warning text-uppercase">Back to shop</Link>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Cart


