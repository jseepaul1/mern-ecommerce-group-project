const Product = require("../models/product.model");
const User = require("../models/user.model");
require("dotenv").config();

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const filterObject = {};

      if (req.query.category) {
        filterObject["category"] = req.query.category;
      }

      if (req.query.productName) {
        const regExpString = `.*${req.query.productName}.*`;
        // console.log("regExpString - ", regExpString);
        filterObject["productName"] = {
          $regex: new RegExp(regExpString, "i"),
        };
      }

      const findAllProducts = await Product.find(filterObject)
        .populate("createdBy", "firstName lastName email")
        .sort("category");
      res.status(201).json(findAllProducts);
    } catch (err) {
      res.status(400).json({ message: "error in findAll", error: err });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = await Product.create({
        ...req.body,
        createdBy: req.user._id,
      });
      // console.log("newProduct - ", newProduct);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: "error in create", error: err });
    }
  },

  getProductById: async (req, res) => {
    try {
      console.log("find one id", req.params.id);
      const oneProduct = await Product.findOne({ _id: req.params.id });
      // console.log("oneProduct - ", oneProduct);
      res.status(200).json(oneProduct);
    } catch (err) {
      res.status(400).json({ message: "error in find one", error: err });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updateOneProductById = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json(updateOneProductById);
    } catch (err) {
      res.status(400).json({ message: "error in update product", error: err });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleteOneProductById = await Product.deleteOne({
        _id: req.params.id,
      });
      // console.log("deleteOneProductById", deleteOneProductById);
      res.status(200).json(deleteOneProductById);
    } catch (err) {
      res.status(400).json({ message: "error in delete product", error: err });
    }
  },
};
