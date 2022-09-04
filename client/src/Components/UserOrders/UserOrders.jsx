import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router";
import "./UserOrders.css"

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Get current user's orders
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/orders/user`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setProducts(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>Your Orders</h1>
      <div className="container mt-6">
        <div className="row">
          {orders.map((order, index) => (
            <div key={index}>
              <div className="d-flex flex-row flex-wrap justify-content-center">
                {order.items.map((product, index) => (
                  <div
                    className="card mx-4 product-card"
                    key={index}
                    onClick={() => navigate(`/product/${product.productId}`)}
                  >
                    <img
                      className="card-img-top"
                      style={{ width: "auto", height: "12rem" }}
                      src={product.productImage}
                      alt="Cardpic"
                    />
                    <div className="card-body">
                      <div className="card-title">
                        <h6>{product.productName}</h6>
                      </div>
                      <div className="card-text">
                        <h6>${product.price}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <h5>Order {index + 1} | </h5>
                <h6>&nbsp;&nbsp;Total Price: ${order.totalPrice}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
