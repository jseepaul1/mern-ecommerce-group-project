import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './DisplayProduct.css'

const DisplayProduct = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    // Getting manga 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/${id}`, { withCredentials: true })
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id])

    // Add to cart handle
    const submitHandle = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8000/`)
            .then()
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='d-flex'>
                    <div>
                        <img 
                            className='card-img-top mangaCoverImage'
                            style={{ width: '200px', height: 'auto' }} 
                            src={product.image}
                            alt='Cardpic'
                        />
                    </div>
                    <div>
                        <h2>{product.productName}</h2>
                        <h5>{product.price}</h5>
                        <h5>{product.category}</h5>
                        <h6>{product.description}</h6>
                        <button className='btn btn-primary' onClick={submitHandle}> Add to cart </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayProduct