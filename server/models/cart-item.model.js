const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
  {
    item: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      price: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1 item"],
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
