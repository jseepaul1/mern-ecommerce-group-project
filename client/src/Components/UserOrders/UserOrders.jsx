import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-bootstrap-icons';
import Header from '../Header/Header';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    // Get current user's orders
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/orders/user`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
                setProducts(res.data.items)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <Header />
            <h1>Orders</h1>
            <div className="container mt-6">
                <div className="row">
                    {orders.map((order, index) => (
                        <div className='' key={index}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h2>Order {index + 1}  | </h2>
                                <h6>&nbsp;&nbsp;Total Price: ${order.totalPrice}</h6>
                            </div>
                            {order.items.map((product, _id) => (
                                <div className='d-flex justify-content-evenly align-items-center' key={_id}>
                                    <div className='card'>
                                        <div className=''>
                                            <img
                                                className=''
                                                style={{ width: 'auto', height: '120px'}}
                                                src={product.productImage}
                                                alt='Cardpic'
                                            />
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                {/* <Link to={`/product/${product._id}`}> */}
                                                    <h6>{product.productName}</h6>
                                                {/* </Link> */}
                                            </div>
                                            <div className=''>
                                                <h6>${product.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserOrders
