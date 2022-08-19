import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
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
        <h1 className='container mt-5'>
            <div className='d-flex align-items-center'>
                <div className='filterBar'>
                    <p>Filter One</p>
                    <p>Filter Two</p>
                    <p>Filter Three</p>
                </div>
                <div className='d-flex flex-grow-1 justify-content-evenly align-items-center'>
                    <h2>PRODUCTS GO HERE</h2>
                    {products.map((product) => (
                        <div key={product._id} className='card mb-4' style={{ flex: "0 0 30%" }}>
                            <Link to={`/api/products/${product._id}`} style={{ textDecoration: 'none'}}>
                                <img className='card-img-top mangaCoverImage' src={product.coverImage} alt='Cardpic' />
                                <div className='card-body'>
                                    <h2 className='card-title'>{product.name}</h2>
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
