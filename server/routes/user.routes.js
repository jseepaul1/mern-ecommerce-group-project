const UserController = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/authenticateToken");

module.exports = (app) => {
  app.post("/api/users/register", UserController.register);
  app.post("/api/users/login", UserController.login);
  app.post("/api/users/logout", UserController.logout);
  app.patch("/api/users/:id", authenticateToken, UserController.updateUser);
  app.get("/api/user", authenticateToken, UserController.getLoggedInUser);
  app.put("/api/users/:id", authenticateToken, UserController.addToCart);
};
