const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("New user created", newUser);
    const userToken = jwt.sign(
      { _id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
      SECRET
    );
    console.log("Json web token", userToken);
    res
      .status(201)
      .cookie("userToken", userToken, {
        expires: new Date(Date.now() + 500000),
      })
      .json({ successMessage: "user created", user: newUser });
  } catch (error) {
    console.log("Error in Registering user", error);
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const isAdminLogin = req.query.isAdminLogin || false;
  const userDocument = await User.findOne({ email: req.body.email });
  console.log("USER DOC", userDocument);
  if (!userDocument) {
    res.status(400).json({ error: "invalid login information" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDocument.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ error: "invalid login information" });
        // isAdmin is default to false
      } else {
        if (isAdminLogin && !userDocument.isAdmin) {
          res.status(401).json({ message: "User is not an admin" });
        } else {
          const userToken = jwt.sign(
            {
              _id: userDocument._id,
              email: userDocument.email,
              isAdmin: userDocument.isAdmin,
            },
            SECRET
          );
          console.log("Json  web token", userToken);
          res
            .status(201)
            .cookie("userToken", userToken, {
              expires: new Date(Date.now() + 500000),
            })
            .json({ successMessage: "user logged in", user: userDocument });
        }
      }
    } catch (error) {
      console.log("Error in logging in user ", error);
      res.status(400).json({ error: "invalid login information" });
    }
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ successMessage: "User logged out" });
};

const updateUser = async (req, res) => {
  try {
    jwt.verify(req.cookies.userToken, SECRET);
    const currentUser = await User.findById(req.params.id);
    const { email, firstName, lastName, shippingAddress, billingInformation } = req.body;
    currentUser.email = email || currentUser.email;
    currentUser.firstName = firstName || currentUser.firstName;
    currentUser.lastName = lastName || currentUser.lastName;
    currentUser.shippingAddress =
      shippingAddress || currentUser.shippingAddress;
    currentUser.billingInformation =
      billingInformation || currentUser.billingInformation;
    console.log('currentUser - ', currentUser);
    await User.findByIdAndUpdate(
      currentUser.id,
      {
        ...currentUser,
      },
      { runValidators: true }
    );
    res.status(200).json({ currentUser });
  } catch (error) {
    console.log("Error in updating user ", error);
    res.status(400).json(error);
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    const currentUser = await User.findOne({ _id: user._id });
    res.json(currentUser);
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  updateUser,
};
