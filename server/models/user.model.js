const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
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
