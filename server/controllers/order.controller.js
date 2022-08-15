const Order = require("../models/order.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const findAllOrders = await Order.find({}).populate(
        "createdBy",
        "firstName lastName email"
      );
      res.status(201).json(findAllOrders);
    } catch (err) {
      res.status(400).json({ message: "error in findAll orders", error: err });
    }
  },
  createOrder: async (req, res) => {
    try {
      const newOrder = await Order.create({
        ...req.body,
        createdBy: req.user._id,
      });
      console.log("newOrder - ", newOrder);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: "error in create order", error: err });
    }
  },
  getOrderById: async (req, res) => {
    try {
      console.log("find one order by id", req.params.id);
      const oneOrder = await Order.findOne({ _id: req.params.id }).populate(
        "createdBy",
        "firstName lastName email"
      );
      console.log("oneOrder - ", oneOrder);
      res.status(200).json(oneOrder);
    } catch (err) {
      res.status(400).json({ message: "error in find one order", error: err });
    }
  },

  getOrdersByUserId: async (req, res) => {
    try {
      console.log("request -", req.user);
      const userId = req.user._id;
      console.log("find orders by user id", userId);
      const orders = await Order.find({ createdBy: userId });
      res.status(200).json(orders);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in finding orders by user id ", error: err });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updateOneOrderById = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json(updateOneOrderById);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in update one order ", error: err });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deleteOneOrderById = await Order.deleteOne({
        _id: req.params.id,
      });
      console.log("deleteOneOrderById", deleteOneOrderById);
      res.status(200).json(deleteOneOrderById);
    } catch (err) {
      res
        .status(400)
        .json({ message: "error in delete one order", error: err });
    }
  },
};
