const AccountNonProfitModel = require("../models/accountNonProfitModel.js");
const AccountProfitModel = require("../models/profit_model");
const AccountModel = require("../models/account_model.js");

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
  static async createAccountService(Name, Expense, Remarks,Reason,idClient) {
    try {
      console.log("create Non profit");

      const querryClient = await AccountModel.findOneAndUpdate(
        { _id: idClient },
        {
          $inc: { Balance: -Expense },
        },
        { new: true }
      );

      const saving = new AccountNonProfitModel({ Name, Expense, Remarks ,Reason,idClient});
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

  static async deleteAccountService(Name, Expense, Remarks,idClient,Reason) {
    try {
      console.log("create Non profit delete");

      const querryClient = await AccountModel.findOneAndUpdate(
        {_id:idClient},
        {
          $inc: { Balance: Expense },
        },
        { new: true }
      );

      const deleteNonProfit = await AccountNonProfitModel.deleteOne({
        idClient:idClient,
        Name: Name,
        Expense: Expense,
        Remarks: Remarks,
        Reason:Reason
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async update_nonprofit_accounts(data) {
    try {
      let acc_id = data._id;
      console.log("updateAccounts temp: " + acc_id);

      const old= await AccountNonProfitModel.findOne({_id:data._id})

      const oldClient = await AccountModel.findOneAndUpdate(
        {_id:old.idClient},
        {
          $inc: { Balance:old.Expense},
        },
        { new: true }
      );

      const querryClient = await AccountModel.findOneAndUpdate(
        {_id:data.idClient},
        {
          $inc: { Balance: -data.Expense },
        },
        { new: true }
      ); 
      

      const updated = await AccountNonProfitModel.findOneAndUpdate(
        { _id: data._id },
        {
          Name: data.Name,
          Expense: data.Expense,
          Remarks: data.Remarks,
          idClient:data.idClient,
          Reason:data.Reason
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
};
