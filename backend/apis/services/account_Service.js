const AccountModel = require("../models/account_model.js");
const bcrypt = require("bcrypt");

module.exports = class AccountNonProfitService {
  static async createAccountService(name, Bank, Balance, Remarks) {
    try {
      console.log("error");
      const saving = new AccountModel({ name, Bank, Balance, Remarks });
      await saving.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async viewAccount() {
    const data = await AccountModel.find();
    //   res.send(data);
    return data;
  }
};
