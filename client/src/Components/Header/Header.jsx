import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./Header.css";

const Header = ({ refreshCart, setRefreshCart }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState();
  const [cart, setCart] = useState();
  const navigate = useNavigate("");

  const updateCart = () => {
    axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setCart(res.data.cart.length);
        setUserId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get logged in user
  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    if (refreshCart) {
      updateCart();
      setRefreshCart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCart]);

  // Logout handle
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand>
          <h2 className="me-4 logo-name">CLOTHESЯUS</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="mx-3">
              <Link to={"/dashboard"}>
                <Navbar.Text href="/dashboard">Home</Navbar.Text>
              </Link>
            </div>
            <div className="mx-3">
              <Link to={`/profile/${userId}`}>
                <Navbar.Text>Profile</Navbar.Text>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <NavbarCollapse className="justify-content-end">
          <Nav className="me-5 align-items-center">
            <Navbar.Text className="me-3 ">
              Signed in as:{" "}
              {user && (
                <span>
                  {user.firstName} {user.lastName}
                </span>
              )}
            </Navbar.Text>
            <Navbar.Text>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={`/checkout/${user._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="36"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </Link>
            </Navbar.Text>
            <Navbar.Text>{cart}</Navbar.Text>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Header;
