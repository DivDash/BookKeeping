"use strict";
const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/account_controller.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/account", AccountController.createAccount);

// router.post("/signin", AdminController.login_admin);
router.get("/viewaccount", AccountController.viewAccount);

module.exports = router;
