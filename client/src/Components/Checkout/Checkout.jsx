import "./Checkout.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import groupBy from "lodash.groupby";
import { Link, useNavigate } from "react-router-dom";
import { DashSquare } from "react-bootstrap-icons";

import Header from "../Header/Header";

const Checkout = () => {
  const navigate = useNavigate();
  const [refreshCart, setRefreshCart] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState([]);

  // Get logged in user
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setCartItems(groupBy(res.data.cart, "_id"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("cartItems - ", cartItems);
    window.cartItems = cartItems;
  }, [cartItems]);

  // Remove product from cart
  const removeProductHandle = (productId) => {
    axios
      .delete(
        `http://localhost:8000/api/users/remove-product-from-cart/${productId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setCartItems(groupBy(res.data.cart, "_id"));
        setRefreshCart(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    let totalItems = 0;
    let totalPrice = 0;
    for (const [_id, items] of Object.entries(cartItems)) {
      totalItems += items.length;
      totalPrice += items.reduce(
        (totalPrice, item) => totalPrice + item.price,
        0
      );
    }
    setTotalPrice(totalPrice);
    setTotalItems(totalItems);
  }, [cartItems]);

  // Create order handler
  const createOrderHandle = () => {
    const items = Object.entries(cartItems).map(([id, items]) => ({
      productId: id,
      price: items[0].price,
      quantity: items.length,
    }));
    console.log("Order POST object - ", {
      items,
      totalPrice,
    });

    axios
      .post(
        "http://localhost:8000/api/orders",
        {
          items,
          totalPrice,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header refreshCart={refreshCart} setRefreshCart={setRefreshCart} />
      <h2>Shopping Cart</h2>
      <div className="container mt-6">
        <div class="row">
          <div class="column-1">
            {Object.keys(cartItems).map((_id) => (
              <div className="checkout-item" key={_id}>
                <div className="image-checkout">
                  <img
                    className="card-image-checkout"
                    src={cartItems[_id][0].image}
                    alt="Cardpic"
                  />
                </div>
                <div className="checkout-container">
                  <Link to={`/product/${_id}`}>
                    <div>
                      <h6 className="checkout-product-name">
                        {cartItems[_id][0].productName}
                      </h6>
                    </div>{" "}
                  </Link>
                  <div className="checkout-price">
                    ${cartItems[_id][0].price}
                  </div>
                  <div className="total-item">
                    <span>
                      x <strong>{cartItems[_id].length}</strong>
                    </span>
                  </div>
                  <div className="remove-button-container">
                    <DashSquare
                      size={30}
                      onClick={() => removeProductHandle(_id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="column-2">
            <div className="remove-item">
              <div className="total-price">
                Subtotal: ({totalItems} items) ${totalPrice}
              </div>
              <button className="btn btn-warning mt-2" onClick={createOrderHandle}>
                Complete Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
