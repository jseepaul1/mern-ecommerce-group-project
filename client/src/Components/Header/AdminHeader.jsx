import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./Header.css";

const AdminHeader = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate("");

  // Get logged in user
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <Link to="/product/new">
                <Navbar.Text>Add Product</Navbar.Text>
              </Link>
            </div>
            <div className="mx-3">
              <Link to="/admin/dashboard">
                <Navbar.Text>Dashboard</Navbar.Text>
              </Link>
            </div>
            <div className="mx-3">
              <Link to="/admin/dashboard/orders">
                <Navbar.Text>Orders</Navbar.Text>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <NavbarCollapse className="justify-content-end">
          <Nav className="me-5 align-items-center">
            <Navbar.Text className="me-3 ">
              Admin Signed in:{" "}
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
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
