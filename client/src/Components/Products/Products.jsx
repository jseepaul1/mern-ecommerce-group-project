import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, loading }) => {
    if(loading) {
        return <h2>Loading...</h2>
    }
    return (
    <div>
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
    )
}

export default Products
