import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DisplayProduct.css'

const DisplayProduct = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    // Getting manga 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id])

    return (
        <div>
            <div className='container'>
                <div>
                    {product.productName}
                    {product.price}
                    {product.category}
                    {product.description}
                    {product.image}
                </div>
            </div>
        </div>
    )
}

export default DisplayProduct