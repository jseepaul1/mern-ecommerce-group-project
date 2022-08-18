import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ProductForm from "../Components/AdminLoginForm/ProductForm";
import axios from "axios";

const UpdateProduct = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then(({ data }) => {
          console.log("data from update product-", data);
          setCurrentProduct(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCurrentProduct(state);
      console.log("coming from state", state);
    }
  }, [id, state]);

  const submitHandler = (product, setErrors) => {
    axios
      .put(`http://localhost:8000/api/products/${id}`, product)
      .then((response) => {
        console.log(response);
        setCurrentProduct(response.data);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log("error response data errors", err.response.data.errors);
        setErrors(err.response.data.error.errors);
      });
  };
  return currentProduct ? (
    <>
      Edit - {currentProduct.productName} Report
      <ProductForm
        submitHandler={submitHandler}
        currentProduct={currentProduct}
        buttonText="Edit Report"
      />
    </>
  ) : null;
};

export default UpdateProduct;
