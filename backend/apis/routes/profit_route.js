"use strict";
const express = require("express");
const router = express.Router();
const profitController = require("../controllers/profit_controller");

router.post("/createaccountprofit", profitController.createProfitProject);

router.get("/viewaccountprofit", profitController.getProfitProject);

router.delete("/deleteprofit", profitController.deleteProfitProject);

module.exports = router;
