"use strict";
const express = require("express");
const router = express.Router();
const AccountNonProfitController = require("../controllers/accountNonProfitController.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post(
  "/createaccountnonprofit",
  AccountNonProfitController.createAccount
);

router.post(
  "/updatenonprofitaccount",
  AccountNonProfitController.updateNonProfitAccount
);

router.get("/viewaccountnonprofit", AccountNonProfitController.viewAccount);

router.delete("/deletenonprofit", AccountNonProfitController.deleteAccount);

module.exports = router;
