import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginAndRegistration.css'

const LoginAndRegistration = () => {
  const navigate = useNavigate();
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterUser({
      ...registerUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/register",
        {
          ...registerUser,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data);
        setRegisterErrors(err.response);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        { ...loginUser },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoginErrors(err.response.data);
      });
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "grey" }}>
      <div className="d-flex justify-content-evenly pt-5">
        <div
          className="justify-content-evenly card p-2 w-50"
          style={{ backgroundColor: "#eee" }}
        >
          <form onSubmit={handleRegisterSubmit} className='registerForm'>
            <h2 className="pt-5">Register</h2>
            <div className="align-items-center py-2">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    onChange={handleRegisterChange}
                    value={registerUser.firstName}
                    required
                    className="form-control"
                    autoComplete="off"
                  />
                  {registerErrors.firstName && (
                    <span className="text-danger">
                      {registerErrors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="col">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleRegisterChange}
                    value={registerUser.lastName}
                    required
                    className="form-control"
                    autoComplete="off"
                  />
                  {registerErrors.lastName && (
                    <span className="text-danger">
                      {registerErrors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="align-items-center py-3">
              <div className="col-auto">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleRegisterChange}
                  value={registerUser.email}
                  required
                  className="form-control"
                  autoComplete="off"
                />
                {registerErrors.email && (
                  <span className="text-danger">
                    {registerErrors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="align-items-center py-3">
              <div className="col-auto">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleRegisterChange}
                  value={registerUser.password}
                  required
                  className="form-control"
                  autoComplete="off"
                />
                {registerErrors.password && (
                  <span className="text-danger">
                    {registerErrors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="align-items-center py-3">
              <div className="col-auto">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  onChange={handleRegisterChange}
                  value={registerUser.confirmPassword}
                  required
                  className="form-control"
                  autoComplete="off"
                />
                {registerErrors.confirmPassword && (
                  <span className="text-danger">
                    {registerErrors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <button className="btn btn-success my-3">Register</button>
          </form>
        </div>
        <div
          className="justify-content-evenly card p-2 w-25"
          style={{ backgroundColor: "#eee" }}
        >
          <form onSubmit={handleLoginSubmit} className='loginForm'>
            <h2>Login</h2>
            <div className="align-items-center py-2">
              <div className="align-items-center py-3">
                <div className="col-auto">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    onChange={handleLoginChange}
                    value={loginUser.email}
                    required
                    className="form-control"
                    autoComplete="off"
                  />
                  {loginErrors.error && (
                    <span className="text-danger">{loginErrors.error}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="align-items-center py-2">
              <div className="align-items-center">
                <div className="col-auto">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleLoginChange}
                    value={loginUser.password}
                    required
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-primary my-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegistration;
