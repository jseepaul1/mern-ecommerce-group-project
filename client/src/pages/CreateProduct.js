import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Components/AdminLoginForm/ProductForm";

const CreateProduct = () => {
  const navigate = useNavigate();
  const submitHandler = (product, setErrors) => {
    axios
      .post("http://localhost:8000/api/products", product, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        // console.log("error response data", err.response.data);
        console.log("error response data errors", err.response.data.errors);
        setErrors(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <ProductForm submitHandler={submitHandler} buttonText={"Add Product"} />
    </div>
  );
};

export default CreateProduct;
