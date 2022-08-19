import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const filters = [
        "Jeans",
        "Shirts",
        "Suits",
        "Coats",
        "Dresses",
        "Hoodies",
        "Hats",
        "Shoes",
        "Shorts",
        "Sweaters",
        "Gym clothes",
        "High heels",
        "Skirts",
        "Socks",
        "Tie",
        "Caps",
        "Scarfs",
        "Swimsuits",
        "Pajamas",
    ];
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/products', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    return (
    <div>
        <Header />
        <h1 className='container mt-5'>
            <div className='d-flex'>
                <div className='filterBar px-5 py-2 me-5'>
                    {filters.map((filter, index) => (
                        <h4 key={index}>
                            <Link to={''}>
                                {filter}
                            </Link>
                        </h4>
                    ))}
                </div>
                <div className='d-flex flex-grow-1 justify-content-evenly align-items-center flex-wrap productList'>
                    {products.map((product) => (
                        <div key={product._id} className='card mb-4' style={{ flex: "0 0 30%" }}>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                <img 
                                    className='card-img-top mangaCoverImage'
                                    src={product.image}
                                    style={{ width: '200px', height: 'auto' }}
                                    alt='Cardpic'
                                />
                                <div className='card-body'>
                                    <h2 className='card-title'>{product.productName}</h2>
                                    <h4 className='card-title'>${product.price}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </h1>
    </div>
    )
}

export default Dashboard
