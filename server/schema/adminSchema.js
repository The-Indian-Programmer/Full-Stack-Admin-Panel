const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

admin.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.TOKEN_SECRET_KEY
    );

    /// add token into the database
    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};

const adminSchema = mongoose.model("alladmin", admin);
module.exports = adminSchema;
