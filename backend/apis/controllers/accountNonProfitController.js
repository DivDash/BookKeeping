'use strict';
// const accountNonProfitService = require("../services/accountNonProfitService.js");
const Authenticate = require("../../middlewares/Authenticate");
const AccountProfitModel = require("../models/accountNonProfitModel");
const AccountNonProfitService = require("../services/accountNonProfitService.js");

module.exports = class AccountNonProfit{


    static async createAccount(req, res, next){
      try {
        let check = false;
        console.log("fds")
        const { Name, Expense, Remarks } = req.body;
        if (!Name || !Expense || !Remarks) {
          check = true;
          res.json({ message: "Fill All The Fields" });
        }
        if (check === false) {
          
          // const {match,token } = await AdminService.loginAdmin(email,password);
          const response=await AccountNonProfitService.createAccountService(Name,Expense,Remarks)
          // const saving = new AccountsNonProfit({ Name, Expense, Remarks });
          // await saving.save();

          
          res.json({ message: "Account Added" });
        }
      }
      catch (err) {
        console.log(err);
        res.send("there is error cc");
      }
    }

  //  static async login_admin(req, res, next){
  //     try {
  //       let { email, password } = req.body;

  //       if (!email || !password) {
  //         res.json({ message: "Fill The Full Form" });
  //       } else {
          
  //         const {match,token } = await AdminService.loginAdmin(email,password);
              
  //         res.cookie("Book", token, {
  //           expires: new Date(Date.now() + 864000000),
  //           httpOnly: false,
  //         });
              

  //         if (match) {
  //           res.json({ message: "loggin succesfully" });
  //         }
  //         if (!match) {
  //           res.json({ message: "Invalid Credentials" });
  //         }  
  //       }
  //     } 
  //     catch (error) {
  //        res.status(500).json({error: error});
  //     }
  //  }

//    static async apiDeleteAdmin(req, res, next){
//          try {
//             const AdminId = req.params.id;
//             const deleteResponse =  await AdminService.deleteAdmin(AdminId)
//             res.json(deleteResponse);
//          } catch (error) {
//             res.status(500).json({error: error})
//          }
//    }

}