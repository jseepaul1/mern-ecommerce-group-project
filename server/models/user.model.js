const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const shippingAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street number is required"],
    minLength: [3, "Street cannot be less than 3 characters"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
    minLength: [3, "City cannot be less than 3 characters"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    minLength: [2, "State cannot be less than 2 characters"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is required"],
    validate: {
      validator: function (val) {
        return val.toString().length === 5;
      },
      message: (val) => `${val.value} has to be 5 digits`,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: (val) => `${val.value} has to be 10 digits`,
    },
  },
});

const billingInformationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    minLength: [4, "Name cannot be less than 4 characters"],
  },
  cardNumber: {
    type: String,
    required: [true, "Card Number is required"],
    validate: {
      validator: function (val) {
        return val.toString().length === 16;
      },
      message: (val) => `${val.value} has to be 16 digits`,
    },
  },
  expirationDate: {
    type: Date,
    required: [true, "Expiration Date is required"],
    maxLength: [8, "Expiration Date is too long"],
  },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [2, "First Name must be at least 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [2, "Last Name must be at least 2 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        default: undefined,
      },
    ],
    shippingAddress: {
      type: shippingAddressSchema,
      required: false,
    },
    billingInformation: {
      type: billingInformationSchema,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must Match");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    console.log("in pre save", this.password);
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("hashedPassword", hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log("error in save", err);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
