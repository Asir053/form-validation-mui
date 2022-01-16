const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
require("./db/conn.js");
// const User = require("./model/userSchema");

app.use(express.json());

app.use(require("./router/auth"));

const middleware = (req, res, next) => {
  console.log("Middleware");
  next();
};

// middleware();

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.get("/about", middleware, (req, res) => {
  res.send("Hello Middleware");
});

app.listen(PORT, () => {
  console.log(`Server is running at port no. ${PORT}`);
});
