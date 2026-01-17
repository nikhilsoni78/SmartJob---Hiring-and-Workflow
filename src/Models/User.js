const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYER", "CANDIDATE"],
      default: "CANDIDATE",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,{expiresIn: '1h'}
  );
}

UserSchema.methods.checkPass = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
}

module.exports = mongoose.model("User", UserSchema);
