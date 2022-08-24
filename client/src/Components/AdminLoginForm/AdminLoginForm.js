import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
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
        console.log("error response data errors", err.response.data.error);
        setErrorMessage(err.response.data.error);
      });
  };
  return (
    <div className="container mt-5" style={{ backgroundColor: "grey" }}>
      <div className="d-flex justify-content-evenly pt-5">
        <div
          className="justify-content-evenly card p-2 w-50"
          style={{ backgroundColor: "#eee" }}
        >
          <form onSubmit={submitAdminHandler}>
            <div className="align-items-center py-3">
              <div className="col-auto">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="align-items-center py-3">
              <div className="col-auto">
                <label htmlFor="email">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
