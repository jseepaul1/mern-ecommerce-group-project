const productController = require("../controllers/product.controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const { authenticateAdmin } = require("../middleware/authenticateAdmin");

module.exports = (app) => {
  app.get("/api/products", productController.getAllProducts);
  app.get(
    "/api/products/:id",
    authenticateToken,
    productController.getProductById
  );
  app.post(
    "/api/products",
    authenticateToken,
    authenticateAdmin,
    productController.createProduct
  );
  app.patch(
    "/api/products/:id",
    authenticateToken,
    authenticateAdmin,
    productController.updateProduct
  );
  app.delete(
    "/api/products/:id",
    authenticateToken,
    authenticateAdmin,
    productController.deleteProduct
  );
};
