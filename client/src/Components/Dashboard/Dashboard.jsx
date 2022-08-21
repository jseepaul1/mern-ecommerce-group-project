import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import Products from '../Products/Products';
import Pagination from './Pagination/Pagination';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(2);
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

    // Get all products
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:8000/api/products', { withCredentials: true })
            console.log(res.data);
            setProducts(res.data);
            setLoading(false);
            }
        getProducts();
    }, []);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
    <div>
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
                <Products products={currentProducts} loading={loading}/>
            </div>
            <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
        </h1>
    </div>
    )
}

export default Dashboard
