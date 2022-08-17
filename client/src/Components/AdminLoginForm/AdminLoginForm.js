import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const submitAdminHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login?isAdminLogin=true",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log("Error in login", err);
        console.log("error response", err.response);
        console.log("error response data errors", err.response.data.message);
        setErrorMessage(err.response.data.error);
      });
  };
  return (
    <form onSubmit={submitAdminHandler}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button>Login</button>
    </form>
  );
};

export default AdminLoginForm;
