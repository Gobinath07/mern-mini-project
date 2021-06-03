import React, { Component } from 'react'
import axios from 'axios'

export const Context = React.createContext();

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            cart: [],
            total: 0,
            alertclass :''
        }
    }
    addItem = (id) => {
        console.log(id);
        const check = this.state.cart.every(item => (item._id !== id))
        if (check) {
            const product = this.state.products.filter(product => product._id === id)
            this.setState({ cart: [...product, ...this.state.cart] })
            if (localStorage.getItem('carts') == null) {
                localStorage.setItem('carts', '[]')
            }
            var old = JSON.parse(localStorage.getItem('carts'))
            old = [...old, ...product]
            localStorage.setItem('carts', JSON.stringify(old))
        }
        else {
            toast.warning("Already added !",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,});
        }
    }

    removeItem = (id) => {
        const { cart } = this.state;
        var filteredCart = cart.filter(item => item._id !== id)
        this.setState({ cart: [...filteredCart] });
        var local = JSON.parse(localStorage.getItem('carts'))
        var filter = local.filter(item => item._id !== id)
        localStorage.setItem('carts', JSON.stringify(filter))
        this.getTotal();
    }

    getTotal = () => {
        const { cart } = this.state;
        this.setState({ total: cart.length * 10.00 })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/profile/images')
            .then(res => {
                console.log(res.data);
                this.setState({
                    products: res.data
                })
            })
            .catch(err => console.log('error'))
    }

    render() {
        let getlocal
        console.log(this.state.cart);
        console.log(this.state.total);
        const { products, cart, total,alertclass} = this.state
        const { addItem, getTotal, removeItem } = this
        return (
            <Context.Provider value={{ products, addItem, cart, getTotal, total, removeItem,alertclass }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Provider
