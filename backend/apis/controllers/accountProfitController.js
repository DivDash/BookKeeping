"use strict";
const AdminService = require("../services/adminService.js");
const Authenticate = require("../../middlewares/Authenticate");
const adminModel = require("../models/adminModel");

module.exports = class Admin {
  //    static async apiGetAllAdmins(req, res, next){
  //        try {
  //          const Admins = await AdminService.getAllAdmins();
  //          if(!Admins){
  //             res.status(404).json("There are no Admin published yet!")
  //          }
  //          res.json(Admins);
  //        } catch (error) {
  //           res.status(500).json({error: error})
  //        }

  //    }

  //    static async apiGetAdminById(req, res, next){
  //       try {
  //          let id = req.params.id || {};
  //          const Admin = await AdminService.getAdminbyId(id);
  //          res.json(Admin);
  //       } catch (error) {
  //          res.status(500).json({error: error})
  //       }
  //    }

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
      // const Adminexist = await Admin.findOne({ email: email });
      // if (Adminexist) {
      //   check = true;
      //   res.json({ message: "Email Already Exist" });
      // }

      if (check === false) {
        console.log("here at saving");
        const createdAdmin = await AdminService.createAdmin(req.body);
        res.json(createdAdmin);
        // res.json({ message: "Registered Sucessfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async login_admin(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        res.json({ message: "Fill The Full Form" });
      } else {
        const { match, token } = await AdminService.loginAdmin(email, password);

        res.cookie("Book", token, {
          expires: new Date(Date.now() + 864000000),
          httpOnly: false,
        });

        if (match) {
          res.json({ message: "loggin succesfully" });
        }
        if (!match) {
          res.json({ message: "Invalid Credentials" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  //    static async apiDeleteAdmin(req, res, next){
  //          try {
  //             const AdminId = req.params.id;
  //             const deleteResponse =  await AdminService.deleteAdmin(AdminId)
  //             res.json(deleteResponse);
  //          } catch (error) {
  //             res.status(500).json({error: error})
  //          }
  //    }
};
