import "./Products.css";
import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return products.length ? (
    <div style={{ width: "100%" }}>
      <div className="d-flex flex-grow-1 justify-content-evenly align-items-center flex-wrap productList">
        {products.map((product) => (
          <div
            key={product._id}
            className="card mb-4 card-container"
            style={{ marginTop: "2%", flex: "0 0 30%" }}
          >
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", height: "100%" }}
            >
              <div className="image-container">
                <img
                  className="card-img-top mangaCoverImage card-image"
                  src={product.image}
                  style={{ padding: "2%", height: "auto" }}
                  alt="Cardpic"
                />
              </div>

              <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <h4 className="card-title price product-price">
                  ${product.price}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Oops nothing found!</div>
  );
};

export default Products;
