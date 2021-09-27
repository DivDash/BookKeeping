"use strict";
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
// const adminModel = require("../apis/models/adminModel");
const AdminModel = require("../models/adminModel.js");
const jwt = require("jsonwebtoken");

router.post("/registration", AdminController.create_admin);

router.post("/signin", AdminController.login_admin);

// router.get("/Getinfo", AdminController.getAdmin);

router.post("/getinfo", async (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  console.log("mubashir, router", token);
  console.log("mubashir, router");
  try {
    console.log("MUBsIR router");
    // const token = req.cookies.Book;
    console.log("MUBASHIR", token);
    const infos = jwt.verify(token, "Book");

    // console.log("helllo", infos);
    const rootuser = await AdminModel.findOne({
      _id: infos._id,
      "tokens.token": token,
    });
    console.log("helllo", token);
    if (!rootuser) {
      res.status(422).json({ error: "error" });
    }
    console.log("ROOOTUSER:", rootuser);
    req.token = token;
    req.rootuser = rootuser;
    req.userID = rootuser._id;
    // next();
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "error" });
  }
  res.send(req.rootuser);
});

// router.post("/getinfo", AdminController.login_admin);

router.get("/Logout", AdminController.adminLogout);

module.exports = router;
