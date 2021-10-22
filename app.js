const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();

// require the dotenv
const dotenv = require("dotenv");
//// config the dotenv here
dotenv.config({ path: "config.env" });

///// create the connection to the database
const connectDb = require("./server/database/connection");
connectDb();

const port = process.env.PORT || 8800;
const host = process.env.HOST;
/////for the json
app.use(express.json());

/// For Employee Actions
app.use("/", require("./server/routes/employeeRoutes"));

app.listen(port, () => {
  console.log(`Server is running in ${host}:${port}`);
});
