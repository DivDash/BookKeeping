const AccountModel = require("../models/account_model.js");
const bcrypt = require("bcrypt");
const  { commonEmitter } = require('../../events')
const changeStream = AccountModel.watch();
changeStream.on('change', (data) => {
    AccountModel.find((err, doc) => {
      if (err) {
        console.log("error")
  
        commonEmitter.emit("view-account", {
          error: err.message
        })
      } else {
        console.log("emit")
        commonEmitter.emit("view-account", doc )
      }
    });
})
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
