const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [3, "Product name must be at least 3 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [1, "Product price must be at least $1"],
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "Jeans",
        "Shirts",
        "Suits",
        "Coats",
        "Dresses",
        "Hoodies",
        "Hats",
        "Shoes",
        "Shorts",
        "Sweaters",
        "Gym clothes",
        "High heels",
        "Skirts",
        "Socks",
        "Tie",
        "Caps",
        "Scarfs",
        "Swimsuits",
        "Pajamas",
      ],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      minLength: [8, "Description cannot be less than 8 characters"],
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
