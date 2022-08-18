import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import AdminHeader from "../Header/AdminHeader";
import { useNavigate } from "react-router-dom";

const ProductForm = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleCancel = () => {
    navigate("/admin/dashboard");
  };
  const [product, setProduct] = useState(
    props.currentProduct || {
      productName: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    }
  );

  useEffect(() => {
    console.log("current product", props.currentProduct);
    if (props.currentProduct) {
      setProduct(props.currentProduct);
    }
  }, [props.currentProduct]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("product", product);
    console.log("props", props);
    props.submitHandler(product, setErrors);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AdminHeader />
      <Container className="product-container">
        <form onSubmit={submitHandler}>
          <h2>Add Product</h2>
          <br />
          <div className="form">
            <label>Name:</label>
            <input className="input"
              type="text"
              value={product.productName}
              onChange={handleChange}
              name="productName"
            />
            <br />
            {errors.productName && (
              <p className="product-error-message">
                {errors.productName.message}
              </p>
            )}
            <label>Price:</label>
            <input 
              className="category"
              type="number"
              value={product.price}
              onChange={handleChange}
              name="price"
            />
            {errors.price && (
              <p className="product-error-message">{errors.price.message}</p>
            )}
            <br />
            <label>ImageURL:</label>
            <input className="input"
              type="text"
              value={product.image}
              onChange={handleChange}
              name="image"
            />
            {errors.image && (
              <p className="product-error-message">{errors.image.message}</p>
            )}
            <br />
            <label>Categories:</label>
            <select
              className="category"
              onChange={handleChange}
              name="category"
              value={product.category}
            >
              <option>SELECT A CATEGORY</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirts</option>
              <option value="Suits">Suits</option>
              <option value="Coats">Coats</option>
              <option value="Dresses">Dresses</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Hats">Hats</option>
              <option value="Shoes">Shoes</option>
              <option value="Shorts">Shorts</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Gym clothes">Gym clothes</option>
              <option value="High heels">High heels</option>
              <option value="Skirts">Skirts</option>
              <option value="Socks">Socks</option>
              <option value="Tie">Tie</option>
              <option value="Caps">Caps</option>
              <option value="Scarfs">Scarfs</option>
              <option value="Swimsuits">Swimsuits</option>
              <option value="Pajamas">Pajamas</option>
            </select>
            {errors.category && (
              <p className="product-error-message">{errors.category.message}</p>
            )}
            <br />
            <label>Description</label>
            <textarea
              type="text"
              value={product.description}
              onChange={handleChange}
              name="description"
            />
            {errors.description && (
              <p className="product-error-message">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className ="product-button">
          <Button
            className="product-button"
            type="submit"
            value={props.buttonText}
          >
            Add Product
          </Button>
          <Button className="product-button" type = "submit" variant="success" onClick={handleCancel}>
            Cancel
          </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default ProductForm;
