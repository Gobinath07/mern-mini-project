import React, { useContext, useEffect } from 'react';
import { Context } from './context/Context';

const Details = ({ match }) => {
    const { products, addItem } = useContext(Context)
    const { id } = match.params;

    const add = (id) => {
        addItem(id);
    };

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])
    return (
        <div>
            <section>
                <div className="container-fluid bg-secondary d-flex align-items-center justify-content-center" id="cartPage_intro">
                    <h1 className="text-uppercase text-white">Details</h1>
                </div>
            </section>

            <section>
                <div className="container mt-5">
                    {products.filter(product => product._id === id).map(filterItem => (
                        <>
                            <div className="row m-2">
                                <div className="col-12 col-md-6 align-self-center p-2">
                                    <div className="carousel slide car-card" id="withControl2" data-ride="carousel" data-interval="2000">
                                        <div className="carousel-inner">
                                            {filterItem.files.map((file, index) => (
                                                <>
                                                    {index === 0 ? (
                                                        <div className="carousel-item active" key={file.filename}>
                                                            <img className="d-block w-100"
                                                                src={`http://localhost:5000/${file.filename}`}
                                                                alt={file.filename}
                                                                width='435px'
                                                                height='290px'
                                                            />
                                                        </div>) : (
                                                        <div className="carousel-item " key={file.filename}>
                                                            <img className="d-block w-100"
                                                                src={`http://localhost:5000/${file.filename}`}
                                                                alt={file.filename}
                                                                width='435px'
                                                                height='290px'
                                                            />
                                                        </div>)}
                                                </>
                                            ))
                                            }

                                        </div>
                                        {filterItem.files.length > 1 ? (
                                            <>
                                                <a href="#withControl2" className="carousel-control-prev" data-slide="prev">
                                                    <span className="carousel-control-prev-icon"></span>
                                                </a>
                                                <a href="#withControl2" className="carousel-control-next" data-slide="next">
                                                    <span className="carousel-control-next-icon"></span>
                                                </a>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 align-self-center">
                                    <div className="row justify-content-center">
                                        <div className="col-6 text-center mt-2 mt-md-0">
                                            <h1 className="text-uppercase font-weight-bold">{filterItem.Foodname}</h1>
                                            <h6 className="text-secondary">Quantity: {filterItem.Quantity}</h6>
                                            <h6 className="text-secondary">City: {filterItem.City}</h6>
                                            <h6 className="text-secondary">State: {filterItem.State}</h6>
                                            <h6 className="text-secondary">Phone:
                                            <a href={`tel: ${filterItem.Mobile}`}>{filterItem.Mobile}</a>
                                            </h6>
                                            <button
                                                onClick={() => add(id)}
                                                className="btn btn-warning btn-block px-4 rounded-pill text-center">Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container my-3 mx-0">
                                <span className="text-upperrcase badge badge-danger badge-pill">Description</span>
                                <p className="text-secondary mt-2">
                                    {filterItem.Description}
                                </p>
                            </div>
                        </>
                    ))}

                </div>
            </section>
        </div>
    )
}

export default Details
