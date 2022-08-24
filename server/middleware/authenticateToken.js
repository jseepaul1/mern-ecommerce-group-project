const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken(req, res, next) {
    jwt.verify(
      req.cookies.userToken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          // console.error("Error in authenticate", err);
          res.status(401).json({ verified: false }); 
        } else {
          // console.log("payload - ", payload);
          req.user = payload;
          next();
        }
      }
    );
  },
};
