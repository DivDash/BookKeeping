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
};
