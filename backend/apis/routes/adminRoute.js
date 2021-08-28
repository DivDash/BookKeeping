'use strict';
const  express =  require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController.js");
const Authenticate = require("../../middlewares/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());


router.post("/registration", AdminController.create_admin);

router.post("/signin", AdminController.login_admin);

// router.get("/Getinfo", AdminController.getAdmin);

router.get("/Getinfo", Authenticate, (req, res) => {
    res.send(req.rootuser);
  });

router.get( '/Logout',AdminController.adminLogout)


module.exports =  router;


