const CartController = require("../controllers/cart-item.controller");
const { authenticateToken } = require("../middleware/authenticateToken");

module.exports = (app) => {
  app.post("/api/cart-items", authenticateToken, CartController.postCartItem);
  app.get(
    "/api/cart-items/user",
    authenticateToken,
    CartController.getCartItemsByUserId
  );
  app.patch(
    "/api/cart-items/:id",
    authenticateToken,
    CartController.updateCartItem
  );
  app.delete(
    "/api/cart-items/:id",
    authenticateToken,
    CartController.deleteCartItemById
  );

};
