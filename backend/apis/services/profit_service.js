const AccountProfitModel = require("../models/profit_model");
const bcrypt = require("bcrypt");
const { commonEmitter } = require("../../events");
const changeStream = AccountProfitModel.watch();
changeStream.on("change", (data) => {
  AccountProfitModel.find((err, doc) => {
    if (err) {
      console.log("error");

      commonEmitter.emit("view-account-profit", {
        error: err.message,
      });
    } else {
      console.log("emit");
      commonEmitter.emit("view-account-profit", doc);
    }
  });
});

module.exports = class ProfitService {
  static async validateProfitProject(data) {
    try {
      const { Project, Client } = data;

      const query = { $and: [{ Project: Project }, { Client: Client }] };
      const projectExist = await AccountProfitModel.find(query);

      return projectExist;
    } catch (error) {
      console.log(error);
    }
  }

  static async createProfitProject(data) {
    try {
      const { Project, Client, Receivable, Revenue, Expense, Date, Status } =
        data;

      let newProfitProject = {
        Project,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
      };
      const saving = await new AccountProfitModel(newProfitProject).save();
      return saving;
    } catch (error) {
      console.log(error);
    }
  }

  static async getProfitProject() {
    try {
      let data = await AccountProfitModel.find();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
