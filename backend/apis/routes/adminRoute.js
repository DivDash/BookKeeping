'use strict';
const  express =  require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());


router.post("/api/admin", AdminController.create_admin);

router.post("/signin", AdminController.login_admin);


module.exports =  router;


