'use strict';
const  express =  require("express");
const router = express.Router();
const AccountNonProfitController = require("../controllers/accountNonProfitController.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());


router.post("/accountnonprofit", AccountNonProfitController.createAccount);

router.get('/viewaccountnonprofit',  AccountNonProfitController.viewAccount)

module.exports =  router;


