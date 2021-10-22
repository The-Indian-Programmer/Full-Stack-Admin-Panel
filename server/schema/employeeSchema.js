const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const employee = mongoose.Schema(
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
    role: {
      type: String,
      required: true,
    },
    isVarified: {
      type: Boolean,
      required: false,
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

employee.methods.generateAuthToken = async function () {
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

const employeeSchema = mongoose.model("allEmployee", employee);
module.exports = employeeSchema;
