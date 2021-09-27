"use strict";
// const accountNonProfitService = require("../services/accountNonProfitService.js");
// const Authenticate = require("../../middlewares/Authenticate");
const AccountModel = require("../models/account_model");
const AccountService = require("../services/account_Service.js");

module.exports = class Account {
  static async createAccount(req, res, next) {
    try {
      let check = false;
      const { name, Bank, Balance, Remarks } = req.body;
      if (!name || !Bank || !Balance || !Remarks) {
        check = true;
        res.json({ message: "Fill All The Fields" });
      }
      if (check === false) {
        const response = await AccountService.createAccountService(
          name,
          Bank,
          Balance,
          Remarks
        );
        //   const saving = new AccountModel({ name, Bank, Balance, Remarks });
        //   await saving.save();
        res.json({ message: "Account Added" });
      }
    } catch (err) {
      console.log(err);
      res.send("there is error");
    }
  }
  static async viewAccount(req, res, next) {
    try {
      const data = await AccountService.viewAccount();
      res.send(data);
    } catch (error) {
      res.send("there is error");
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      // const projects = await AccountService.getProjects(req.body);
      // console.log(projects);

      // for (let i = 0; i < projects.length; i++) {
      //   const updateAccounts = await AccountService.updateAccounts(projects[i]);
      // }

      const getRefrences = await AccountService.getRefrences(req.body);

      console.log(req.body,"delete")
      // const deleteAccount = await AccountService.deleteAccount(req.body);

      console.log(getRefrences)

      if(getRefrences.length===0){
      const deleteAccount = await AccountService.deleteAccount(req.body);
      res.json({ message: "account deleted" });
      }
      else{
        res.json({ message: "account not deleted",getRefrences:getRefrences });
      }
    } catch (error) {
      res.send("there is error");
    }
  }




  static async updateAccount(req, res, next) {
    try {
      console.log("mubashir account update:");
      console.log(req.body);

      const updateAccounts = await AccountService.update_accounts(req.body);
      res.json({ message: "account updatedd" });
    } catch (error) {
      res.send("there is error");
    }
  }
};
