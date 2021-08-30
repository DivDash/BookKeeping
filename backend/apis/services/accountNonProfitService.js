const AccountNonProfitModel = require("../models/accountNonProfitModel.js");
const bcrypt = require("bcrypt");
const { commonEmitter } = require("../../events");
const changeStream = AccountNonProfitModel.watch();
changeStream.on("change", (data) => {
  AccountNonProfitModel.find((err, doc) => {
    if (err) {
      console.log("error");

      commonEmitter.emit("view-account-non-profit", {
        error: err.message,
      });
    } else {
      console.log("emit");
      commonEmitter.emit("view-account-non-profit", doc);
    }
  });
});
module.exports = class AccountNonProfitService {
  static async createAccountService(Name, Expense, Remarks) {
    try {
      console.log("error");
      const saving = new AccountNonProfitModel({ Name, Expense, Remarks });
      await saving.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async viewAccountService() {
    try {
      const data = await AccountNonProfitModel.find();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
