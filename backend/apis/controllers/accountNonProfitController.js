"use strict";
// const accountNonProfitService = require("../services/accountNonProfitService.js");
const Authenticate = require("../../middlewares/Authenticate");
const AccountProfitModel = require("../models/accountNonProfitModel");
const AccountNonProfitService = require("../services/accountNonProfitService.js");

module.exports = class AccountNonProfit {
  static async createAccount(req, res, next) {
    try {
      let check = false;
      console.log("fds");
      console.log(req.body)
      const { Name, Expense, Remarks,Reason,idClient} = req.body;
      if (!Name || !Expense || !Remarks|| !Reason || !idClient)   {
        check = true;
        res.json({ message: "Fill All The Fields" });
      }
      if (check === false) {
        const response = await AccountNonProfitService.createAccountService(
          Name,
          Expense,
          Remarks,
          Reason,
          idClient
        );

        res.json({ message: "Account Added" });
      }
    } catch (err) {
      console.log(err);
      res.send("there is error cc");
    }
  }

  static async viewAccount(req, res, next) {
    try {
      console.log("here at non profit");
      const data = await AccountNonProfitService.viewAccountService();
      res.send(data);
    } catch (error) {
      const data = await AccountNonProfitService.viewAccount();
      res.send(data);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      console.log("here at non profit delete");
      const { Name, Expense, Remarks,idClient,Reason} = req.body;
      console.log( Name, Expense, Remarks,idClient,Reason,"nonnn")
      const data = await AccountNonProfitService.deleteAccountService(
        Name,
        Expense,
        Remarks,
        idClient,
        Reason
      );
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
  static async updateNonProfitAccount(req, res, next) {
    try {
      console.log("mubashir account update:");
      console.log(req.body);

      const updateAccounts =
        await AccountNonProfitService.update_nonprofit_accounts(req.body);
      res.json({ message: "account updatedd" });
    } catch (error) {
      res.send("there is error");
    }
  }
};
