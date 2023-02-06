const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

require("dotenv").config();
const UserRoutes = express.Router();

UserRoutes.post("/signup", async (req, res) => {
  const { name, email, pass, role } = req.body;
  try {
    bcrypt.hash(pass, 5, async function (err, hash) {
      const user = new UserModel({
        name,
        email: email,
        pass: hash,
        role
      });
      await user.save();
      res.send("Sign up Successfull");
    });
  } catch (err) {
    console.log(err);
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.send("Please signup first");
  }
  const hashedpwd = user.pass;
  console.log(user._id);
  console.log(hashedpwd);
  bcrypt.compare(pass, hashedpwd, function (err, result) {
    console.log(result);
    if (result) {
      const token = jwt.sign({ userID: user._id }, "SECRET", { expiresIn: 6000 });
      const refresh_token = jwt.sign({ userID: user._id }, "REFRESH_SECRET", {
        expiresIn: 300,
      });
      res.send({ msg: "login successfull", token, refresh_token });
    } else {
      res.send("login failed");
    }
  });

  UserRoutes.get("/getnewtoken", (req, res) => {
    const refresh_token =  req.headers.autenticate?.split(" ")[1];
    console.log(refresh_token);

    if (!refresh_token) {
      res.send("login again");
    }
    jwt.verify(refresh_token, "REFRESH_SECRET", function (err, decoded) {
      if (err) {
        res.send({ message: "plzz login first", err: err.message });
      } else {
        const token = jwt.sign({ userID: decoded.userID }, "SECRET", {
          expiresIn: 20,
        });
        res.send({ msg: "login successfull", token });
      }
    });
  });
});

module.exports = UserRoutes;
