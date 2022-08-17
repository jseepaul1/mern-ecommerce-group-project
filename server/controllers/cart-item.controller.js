const CartItem = require("../models/cart-item.model");
require("dotenv").config();

module.exports = {
  postCartItem: async (req, res) => {
    try {
      const newCartItem = await CartItem.create({
        ...req.body,
        createdBy: req.user._id,
      });
      console.log("newCartItem - ", newCartItem);
      res.status(201).json(newCartItem);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in create cart item", error: err });
    }
  },

  getCartItemsByUserId: async (req, res) => {
    try {
      console.log("request in cart items by user id-", req.user);
      const userId = req.user._id;
      console.log("find one cart items by user id", userId);
      const cartItemsByUserId = await CartItem.find({ createdBy: userId });
      res.status(200).json(cartItemsByUserId);
    } catch (err) {
      res.status(400).json({
        message: "error in getting cart items by user id ",
        error: err,
      });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const updateOneCartItemById = await CartItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json(updateOneCartItemById);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in update one cart item ", error: err });
    }
  },

  deleteCartItemById: async (req, res) => {
    try {
      const deleteOneCartItemById = await CartItem.deleteOne({
        _id: req.params.id,
      });
      console.log("deleteOneCartItemById", deleteOneCartItemById);
      res.status(200).json(deleteOneCartItemById);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in delete one cart item by id", error: err });
    }
  },

  deleteCartItemsByUserId: async (userId) => {
    const deleteResponse = await CartItem.deleteMany({ createdBy: userId });
    console.log("deleteResponse", deleteResponse);
    return deleteResponse;
  },
};
