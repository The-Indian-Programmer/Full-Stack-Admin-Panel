const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

const route = express.Router();

const employeeSchema = require("../schema/employeeSchema");

route.get("/getallemployee", async (req, res) => {
  try {
    const data = await employeeSchema.find();
    if (data.length > 0) {
      return res.json({ msg: "Data Found", data: data });
    }
    return res.json({ err: "No Data Found", data: [] });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
});

route.post("/registeremployee", async (req, res) => {
  try {
    const { name, email, gender, age, password, cpassword, role } = req.body;
    if (
      !name ||
      !email ||
      !gender ||
      !age ||
      !password ||
      !cpassword ||
      !role
    ) {
      return res.status(422).send("All fields are required");
    }

    // check if employee already exits with the email
    const employeeExist = await employeeSchema.findOne({ email: email });
    if (employeeExist) {
      return res.status(422).json({ err: "Email is already exist!" });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const newEmployee = await new employeeSchema({
      name,
      email,
      gender,
      isVarified: false,
      age,
      role,
      password: password_hash,
    });
    const token = await newEmployee.generateAuthToken();

    const userSave = await newEmployee.save();

    if (userSave) {
      res.status(200).json({ msg: "Employee Registered!!", data: newEmployee });
    }
    return res.status(422).json({ err: "Something went wrong" });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
});

route.post("/loginemployee", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await employeeSchema.findOne({ email: email });
    if (!user) {
      return res.json({ err: "Email is not registerd", type: "email" });
    }
    if (!user.isVarified) {
      return res.json({
        err: "This is email is not varified !! Ask for Admin to send a varification mail.",
        type: "email",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.json({ err: "Password do not match", type: "password" });
    }
    return res.status(200).json({ message: "Logged In", data: user });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
});

route.get("/getemployeebyemail", async (req, res) => {
  try {
    const email = req.headers.authorization;
    const employee = await employeeSchema.findOne({ email: email });
    if (employee === null) {
      return res.status(400).json({ err: "Employee Not Found." });
    }
    return res.json({ msg: "User Found", user: employee });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

route.get("/getemployeebyid", async (req, res) => {
  try {
    const id = req.headers.authorization;
    const employee = await employeeSchema.findOne({ _id: id });
    if (employee === null) {
      return res.status(400).json({ err: "Employee Not Found." });
    }
    return res.json({ msg: "User Found", user: employee });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

route.get("/getemployeebytoken", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const employee = await employeeSchema.findOne({
      tokens: { $elemMatch: { token: token } },
    });
    if (employee === null) {
      return res.status(400).json({ err: "User Not Found." });
    }
    return res.json({ msg: "Employee Found", user: employee });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

route.get("/deleteemployeebyid", async (req, res) => {
  try {
    const id = req.headers.authorization;
    const deleteEmployee = await employeeSchema.findByIdAndDelete({ _id: id });
    if (deleteEmployee) {
      return res.json({ message: "Employee Deleted." });
    }
    res.json({ err: "Can't delete Employee" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/updateemployeenamebyid", async (req, res) => {
  try {
    const { name, id } = req.body;
    const updateEmployee = await employeeSchema.findByIdAndUpdate(
      { _id: id },
      { name: name }
    );
    if (updateEmployee) {
      return res.json({ message: "Employee Updated." });
    }
    res.json({ err: "Can't update Employee" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/updateemployeeemailbyid", async (req, res) => {
  try {
    const { email, id } = req.body;
    const updateEmployee = await employeeSchema.findByIdAndUpdate(
      { _id: id },
      { email: email }
    );
    if (updateEmployee) {
      return res.json({ message: "Employee Updated." });
    }
    res.json({ err: "Can't update Employee" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/updateemployeegenderbyid", async (req, res) => {
  try {
    const { gender, id } = req.body;
    const updateEmployee = await employeeSchema.findByIdAndUpdate(
      { _id: id },
      { gender: gender }
    );
    if (updateEmployee) {
      return res.json({ message: "Employee Updated." });
    }
    res.json({ err: "Can't update Employee" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/updateemployeeagebyid", async (req, res) => {
  try {
    const { age, id } = req.body;
    const updateEmployee = await employeeSchema.findByIdAndUpdate(
      { _id: id },
      { age: age }
    );
    if (updateEmployee) {
      return res.json({ message: "Employee Updated." });
    }
    res.json({ err: "Can't update Employee" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/updateemployeepasswordbyid", async (req, res) => {
  try {
    const { password, newPassword, newCPassword, id, tokenid } = req.body;

    if (newPassword.length < 2) {
      return res.json({
        err: "Password Should be at least 2 characters",
        type: "newPassword",
      });
    }
    if (newCPassword !== newPassword) {
      return res.json({ err: "Password do not match", type: "newCPassword" });
    }

    const findEmployee = await employeeSchema.findById({ _id: id });
    const comparePassword = await bcrypt.compare(
      password,
      findEmployee.password
    );
    if (comparePassword) {
      const password_hash = await bcrypt.hash(newPassword, 12);
      const token = await jwt.sign(
        { _id: id.toString() },
        process.env.TOKEN_SECRET_KEY
      );

      res.json({ msg: "Password Updated" });
      const updatePassword = await employeeSchema.findByIdAndUpdate(
        { _id: id },
        {
          password: password_hash,
        }
      );
      if (updatePassword) {
        const updateToken = await employeeSchema.updateOne(
          { _id: id, "tokens._id": tokenid },
          { $set: { "tokens.$.token": token } }
        );
        if (updateToken) {
          res.json({ msg: "Password Updated" });
        }
      }
    } else {
      return res.json({ err: "Password is Wrong ", type: "oldPassword" });
    }

    res.json({ err: "Can't update Employee " });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/changepassword", async (req, res) => {
  try {
    const { password, cpassword, email } = req.body;

    const findEmployee = await employeeSchema.findOne({ email: email });
    const password_hash = await bcrypt.hash(password, 12);
    const token = await jwt.sign(
      { _id: findEmployee._id.toString() },
      process.env.TOKEN_SECRET_KEY
    );

    const updatePassword = await employeeSchema.findByIdAndUpdate(
      { _id: findEmployee._id },
      {
        password: password_hash,
      }
    );
    if (updatePassword) {
      const updateToken = await employeeSchema.updateOne(
        { _id: findEmployee._id, "tokens._id": findEmployee.tokens[0]._id },
        { $set: { "tokens.$.token": token } }
      );
      if (updateToken) {
        res.json({ msg: "Password Updated" });
      }
    }
    res.json({ err: "Can Not Reset Password" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/sendmail", async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await employeeSchema.findOne({ email: email });
    if (employee === null) {
      return res.json({ err: "This Email is not Registered " });
    }
    const code = Math.floor(100000 + Math.random() * 900000);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "sumitkosta07@gmail.com", // Change to your verified sender
      subject: "Admin Panel | Reset Password",
      text: "and easy to do anywhere, even with Node.js sumitkosta jar",
      html: `Your Varification Code For Reset Password is ${code} <br> Enter This code To Reset Password`,
    };
    sgMail
      .send(msg)
      .then(() => {
        res.json({
          code: code,
          msg: `Varification Code Send in your email ${email}`,
        });
      })
      .catch((error) => {
        res.json({ err: "Something Went wrong for" });
      });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/verifymail", async (req, res) => {
  try {
    const { token } = req.body;
    const findEmployee = await employeeSchema.findOne({
      tokens: { $elemMatch: { token: token } },
    });
    if (findEmployee === null) {
      return res.status(400).json({ err: "Employee Not Found." });
    }
    const updateEmp = await employeeSchema.findByIdAndUpdate(
      {
        _id: findEmployee._id,
      },
      { isVarified: true }
    );

    if (updateEmp) {
      return res.json({ msg: "Email Varified!" });
    }
    return res.json({ err: "Something went wrong!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

route.post("/sendvarificationmail", async (req, res) => {
  try {
    const { email, token } = req.body;
    const employee = await employeeSchema.findOne({ email: email });
    if (employee === null) {
      return res.json({ err: "This Email is not Registered " });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "sumitkosta07@gmail.com", // Change to your verified sender
      subject: "Admin Panel | Reset Password",
      text: "and easy to do anywhere, even with Node.js sumitkosta jar",
      html: `Click To Verify your account <br> <a href="${process.env.HOST}:3000/verifymail/${token}" target="_blank">Click Here</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        res.json({
          msg: `Varification Mail Send to email ${email}`,
        });
      })
      .catch((error) => {
        res.json({ err: "This is not a valid email" });
      });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = route;

// All the api
