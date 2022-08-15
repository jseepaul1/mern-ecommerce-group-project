const OrderController = require("../controllers/order.controller");
const { authenticateToken } = require("../middleware/authenticateToken");

module.exports = (app) => {
  app.get("/api/orders", authenticateToken, OrderController.getAllOrders);
  app.post("/api/orders", authenticateToken, OrderController.createOrder);
  app.get(
    "/api/orders/user",
    authenticateToken,
    OrderController.getOrdersByUserId
  );
  app.get("/api/orders/:id", authenticateToken, OrderController.getOrderById);
  app.patch("/api/orders/:id", authenticateToken, OrderController.updateOrder);
  app.delete("/api/orders/:id", authenticateToken, OrderController.deleteOrder);
};
