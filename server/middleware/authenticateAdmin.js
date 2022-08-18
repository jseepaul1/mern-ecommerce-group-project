module.exports = {
  authenticateAdmin(req, res, next) {
    if (req.user && req.user.isAdmin === true) {
      next();
    } else {
      console.error("User is not an admin - ", req.user);
      res.status(401).json({ isAdmin: false });
    }
  },
};
