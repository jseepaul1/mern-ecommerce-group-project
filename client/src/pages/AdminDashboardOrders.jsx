import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";

const AdminDashboardOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    axios
      .get("http://localhost:8000/api/orders", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log("error in getting orders for admin", err));
  };

  const patchOrderDelivery = (order) => {
    axios
      .patch(
        `http://localhost:8000/api/orders/${order._id}`,
        {
          // isDelivered is default to false
          isDelivered: !order.isDelivered,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log("patch response", res.data);
        // gets all the orders with the updated order
        getAllOrders();
      })
      .catch((err) => console.log("error while patching order", err));
  };

  return (
    <div>
      <Container>
        <h3>
          Below is the list of Orders Created by Customers and their Order
          Status
        </h3>
        <Table className="admin-table" striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>First Name and Last Name</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.createdBy.firstName} {order.createdBy.lastName}
                </td>
                <td>
                  {order.createdAt &&
                    new Date(order.createdAt).toISOString().split("T")[0]}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  <Button onClick={() => patchOrderDelivery(order)}>
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
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

export default AdminDashboardOrders;
