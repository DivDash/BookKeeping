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
          
          const response=await AccountNonProfitService.createAccountService(Name,Expense,Remarks)
    
      
          res.json({ message: "Account Added" });
        }
      }
      catch (err) {
        console.log(err);
        res.send("there is error cc");
      }
    }

    static async viewAccount(req, res, next) {
      try {
        const data = await AccountNonProfitService.viewAccount();
        res.send(data);
      } catch (error) {
        res.send("there is error");
      }
    }


}