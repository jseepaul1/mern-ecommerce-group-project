import "./Checkout.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);
  const totalPrice = cartItems.reduce((total, product)=> total + (product.price),0);

  // Get logged in user
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setCartItems(res.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Remove product from cart
  const removeProductHandle = (idFromBelow) => {
    axios
        .put(`http://localhost:8000/api/users/${user._id}`, {} ,{ withCredentials: true })
        .then((res) => {
            console.log(res.data);
            const filteredProducts = cartItems.filter(cartItems => {
                return cartItems._id !== idFromBelow
            });
            setCartItems(filteredProducts);
        })
        .catch((err) => {
            console.log(err.response.data);
        })
}

  // Create order handler
  const createOrderHandle = () => {
    axios
      .post("http://localhost:8000/api/orders", {} ,{ withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <div>
      <h1>Checkout Page</h1>
      <div className="d-flex mt-4">
        <div className="d-flex">
          <div className="d-flex justify-content-evenly align-items-center flex-wrap productList checkout-container">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem._id}
                className="card mb-4 card-container"
                style={{ marginTop: "2%", flex: "0 0 22%", margin: '10px' }}
              >
                <Link
                  to={`/product/${cartItem._id}`}
                  style={{ textDecoration: "none", height: "100%" }}
                >
                  <div className="image-container">
                    <img
                      className="card-img-top mangaCoverImage card-image"
                      src={cartItem.image}
                      style={{ padding: "2%", height: "auto" }}
                      alt="Cardpic"
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{cartItem.productName}</h2>
                    <h4 className="card-title price product-price">${cartItem.price}</h4>
                  </div>
                </Link>
                <button className="btn btn-danger" onClick={() => removeProductHandle(cartItem._id)}>Remove Item</button>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex col-3 mt-5">
          <div className="">
            <h4>Total Price: ${totalPrice}</h4>
            <button className="btn btn-warning" onClick={createOrderHandle}>Complete Your Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
