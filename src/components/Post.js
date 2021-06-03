import React, { useState, useEffect } from 'react';
import axios from 'axios'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Post = () => {

    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth() + 1
    const yyyy = today.getFullYear()

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const yesdd = yesterday.getDate();
    const yesmm = yesterday.getMonth() + 1;
    const yesyyyy = yesterday.getFullYear();

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState(`${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pin, setPin] = useState('')
    const [phone, setPhone] = useState('')
    const [files, setFile] = useState('')

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const changeDesc = (e) => {
        setDesc(e.target.value)
    }
    const changeDate = (e) => {
        setDate(e.target.value)
    }
    const changeCity = (e) => {
        setCity(e.target.value)
    }
    const changeState = (e) => {
        setState(e.target.value)
    }
    const changePin = (e) => {
        setPin(e.target.value)
    }
    const changePhone = (e) => {
        setPhone(e.target.value)
    }
    const changeFile = (e) => {
        setFile(e.target.files)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        toast.success("Post Added Successfully !",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,});
        const data = new FormData();
        data.append('Foodname', name)
        data.append('Quantity', quantity)
        data.append('Description', desc)
        data.append('Date', date)
        data.append('City', city)
        data.append('State', state)
        data.append('Zip', pin)
        data.append('Mobile', phone)

        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i])
        }
        console.log(data)
        await axios.post('http://localhost:5000/profile/post', data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));

        setName('')
        setQuantity('')
        setDesc('')
        setDate('')
        setCity('')
        setState('')
        setPin('')
        setPhone('')
        setFile(null)

        window.location = '/';
      
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    
    // console.log(name, desc, date, city, state, pin, phone, file);
    return (
        <div className="container p-5">
            <h1 className="text-center text-warning text-uppercase font-weight-bold">Upload</h1>
            <form onSubmit={onSubmit} className="border p-5">
                <div className="form-group">
                    
                    <label htmlFor="Food Name">Food Name:</label>
                    <input
                        type="text"
                        value={name}
                        name="food"
                        className="form-control"
                        onChange={changeName}
                        id="Food Name"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity Of Food:</label>
                    <input
                        type="text"
                        value={quantity}
                        name="quantity"
                        className="form-control"
                        onChange={changeQuantity}
                        id="quantity"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description:</label>
                    <textarea
                        className="form-control"
                        value={desc}
                        name="desc"
                        id="desc"
                        onChange={changeDesc}
                        rows="3"
                        required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    {/* <input
                        type="date"
                        id="date"
                        value={date}
                        name="date"
                        onChange={changeDate}
                        className="form-control"
                        required /> */}
                        <input
                        type="date"
                        id="date"
                        class="form-control"
                        name="date"
                        min={`${yesyyyy}-${yesmm < 10 ? '0' + yesmm : yesmm}-${yesdd < 10 ? '0' + yesdd : yesdd}`}
                        max={`${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`}
                        value={date}
                        onChange={changeDate}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City:</label>
                        <input
                            type="text"
                            value={city}
                            name="city"
                            className="form-control"
                            onChange={changeCity}
                            id="inputCity"
                            required />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State:</label>
                        <select
                            id="inputState"
                            className="form-control"
                            value={state}
                            onChange={changeState}
                            name="state"
                            required>
                            <option value="">Choose...</option>
                            <option value="Tamilnadu">Tamil Nadu</option>
                            <option value="Andhra pradesh">Andhra Pradesh</option>
                            <option value="Karnataka">Karnataka</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip:</label>
                        <input
                            type="text"
                            value={pin}
                            name="pin"
                            className="form-control"
                            onChange={changePin}
                            id="inputZip"
                            required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Mobile-Number:</label>
                    <input
                        type="tel"
                        value={phone}
                        name="phone"
                        className="form-control"
                        onChange={changePhone}
                        id="phone"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control-file"
                        id="file"
                        onChange={changeFile}
                        accept="image/*" multiple
                        required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Post</button>
            </form>
        </div>
    )
}

export default Post
