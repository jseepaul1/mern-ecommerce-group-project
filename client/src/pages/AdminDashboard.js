import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log("error in getting products for admin", err));
  }, []);

  const editProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };
  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const newProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(newProducts);
      })
      .catch((err) => console.log(" error in deleting product for admin", err));
  };
  return (
    <div>
      <Container>
        <h2>Welcome to the Admin Panel</h2>
        <h4>
          Here you can Manage Products List as well as View Customers Orders and
          Make Modifications
        </h4>
        <Table className="admin-table" striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>${product.price}</td>
                <td>
                  <Button
                    class="btn btn-success"
                    onClick={() => editProduct(product._id)}
                  >
                    Edit
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                  <Button
                    class="btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminDashboard;
