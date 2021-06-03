import React from 'react'
import google from './images/google.webp';
import appstore from './images/appstore.webp';

const Footer = () => {
    return (
        <footer>
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <div className="col-12 mb-3 mb-md-0 col-md-4">
                        <h4 className="font-weight-bold text-warning">Sevai</h4>
                        <p>Lorem ipsum, dolor sit amet
                        consectetur adipisicing elit. Dolores, hic!
                        morem ipsum dolor sit amet.
                    </p>
                    </div>
                    <div className="col-12 mb-3 mb-md-0 col-md-4">
                        <h3 className="font-weight-bold text-warning">Contact-info</h3>
                        <h5 className="font-weight-bold"><i className="fas fa-map-marker-alt"></i> Our Loaction:</h5>
                        <p>86,4th Hardevi Chambers, Pantheon Road, Egmore</p>
                        <h5 className="font-weight-bold mt-4"><i className="fas fa-phone-alt"></i> Phones:</h5>
                        <a href="tel:+49078-12345-6789" className="text-dark">+49078-12345-6789</a>
                        <br />
                        <a href="tel: +49078-028-55-60" className="text-dark">+49078-028-55-60</a>
                    </div>
                    <div className="col-12 mb-3 mb-md-0 col-md-4">
                        <h4 className="font-weight-bold text-warning">Social Links</h4>
                        <a href="#" className="text-dark m-2"><i className="fab fa-facebook fa-2x"></i></a>
                        <a href="#" className="text-dark m-2"><i className="fab fa-twitter fa-2x"></i></a>
                        <a href="#" className="text-dark m-2"><i className="fab fa-instagram fa-2x"></i></a>
                        <br />
                        <a href="#" className="text-decoration-none text-black">
                            <img src={appstore} width="150px" alt="AppStore" className="my-3" />
                        </a>
                        <a href="#" className="text-decoration-none text-black ml-1">
                            <img src={google} width="150px" alt="Playstore" />
                        </a>
                    </div>
                </div>
                <hr className="mt-5" />
                <p className="text-muted copyright mt-3">
                    By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.2021 © Food™ Ltd. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
