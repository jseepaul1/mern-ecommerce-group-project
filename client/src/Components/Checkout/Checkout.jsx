import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useParams, Link } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState([]);
    const { id } = useParams();

    // Get logged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Get product in cart
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/productsFromCart/${id}`, { withCredentials: true })
            .then((res) => {
                setCartItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
    <div>
        <Header />
        <div>
            <h1>Checkout Page</h1>
            <div>
                {cartItems.map((cartItem) => (
                    <div key={cartItem._id} className='card mb-4' style={{ flex: "0 0 30%" }}>
                        <Link to={`/product/${cartItem._id}`} style={{ textDecoration: 'none' }}>
                            <img 
                                className='card-img-top mangaCoverImage'
                                src={cartItem.image}
                                    style={{ width: '200px', height: 'auto' }}
                                alt='Cardpic'
                            />
                            <div className='card-body'>
                                <h2 className='card-title'>{cartItem.productName}</h2>
                                <h4 className='card-title'>${cartItem.price}</h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Checkout
