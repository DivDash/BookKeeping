"use strict";
const AdminService = require("../services/adminService.js");
const Authenticate = require("../../middlewares/Authenticate");
const adminModel = require("../models/adminModel");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createAdmin } = require("../services/adminService.js");
router.use(cookieParser());

module.exports = class Admin {
  static async create_admin(req, res, next) {
    try {
      console.log(req.body);
      console.log("body");

      let check = false;
      const { name, email, password, confirm, phone, work } = req.body;

      if (!name || !email || !password || !confirm || !phone || !work) {
        check = true;
        res.json({ message: "Fill The Full Form" });
      }
      if (password !== confirm) {
        check = true;
        res.json({ message: "Confirm Password Dosen't Match" });
      }

      if (check === false) {
        console.log("here at saving");
        const createdAdmin = await AdminService.createAdmin(req.body);
        console.log(createdAdmin, "adminnnn");
        res.json(createdAdmin);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async login_admin(req, res, next) {
    try {
      let { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) {
        res.json({ message: "Fill The Full Form" });
      } else {
        const { match, token } = await AdminService.loginAdmin(email, password);

        if (match) {
          res.cookie("Book", token, {
            expires: new Date(Date.now() + 864000000),
            httpOnly: false,
          });
          console.log("here at sucess");
          res.json({ message: "loggin succesfully", token: token });
        }
        if (!match) {
          res.json({ message: "Invalid Credentials" });
        }
      }
    } catch (error) {
      console.log("here at error");
      res.status(500).json({ error: error });
    }
  }

  static async getAdmin(req, res, next) {
    try {
      Authenticate;
      console.log(req.rootuser, "hello");
      res.send(req.rootuser);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async adminLogout(req, res, next) {
    res.clearCookie("Book", { path: "/" });
    res.status(200).json({ message: "success" });
  }
};
