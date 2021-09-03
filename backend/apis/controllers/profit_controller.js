"use strict";

const profitService = require("../services/profit_service");
const AccountService = require("../services/account_Service.js");

const express = require("express");
const { createProfitProject } = require("../services/profit_service");
const ProfitService = require("../services/profit_service");
const router = express.Router();

module.exports = class Profit {
  static async createProfitProject(req, res, next) {
    try {
      console.log("here at profitt");
      let check = false;
      const { Project, Client, Receivable, Revenue, Expense, Date, Status } =
        req.body;
      console.log(Project, Client, Receivable, Revenue, Expense, Date, Status);

      if (!Project || !Client || !Receivable || !Date || !Status) {
        check = true;
        res.json({ message: "Fill The Full Form" });
      }

      const projectExist = await profitService.validateProfitProject(req.body);

      if (projectExist.length !== 0) {
        check = true;
        res.json({ message: "Project With This client Already Exist" });
      }

      if (check === false) {
        let createProfit = await profitService.createProfitProject(req.body);
        res.json({ message: "Project with Client Added" });
      }
    } catch (error) {
      console.log("here at error");
      res.send("error");
    }
  }

  static async getProfitProject(req, res, next) {
    try {
      let getProjects = await profitService.getProfitProject();
      res.send(getProjects);
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteProfitProject(req, res, next) {
    try {
      console.log("delete profittt");

      const updateAccounts = await AccountService.updateAccounts(req.body);

      const deleteAccount = await ProfitService.deleteProject(req.body);

      res.json({ message: "account deleted" });
    } catch (error) {
      res.send("there is error");
    }
  }
  static async updateProfitAccount(req, res, next) {
    try {
      console.log("mubashir account update:");
      console.log(req.body);

      const updateAccounts = await ProfitService.update_profit_accounts(
        req.body
      );
      res.json({ message: "account updatedd" });
    } catch (error) {
      res.send("there is error");
    }
  }
};
