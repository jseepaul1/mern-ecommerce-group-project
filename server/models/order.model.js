const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productName: {
          type: String,
        },
        productImage: {
          type: String,
        },
        price: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1 item"],
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isDelivered: {
      type: Boolean,
      default: false,
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

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
