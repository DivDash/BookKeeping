const AccountNonProfitModel = require("../models/accountNonProfitModel.js");
const bcrypt = require("bcrypt");

module.exports = class AccountNonProfitService{
    
    static async createAccountService(Name,Expense,Remarks){
        try {
            console.log("error")
            const saving = new AccountNonProfitModel({ Name, Expense, Remarks });
          await saving.save();
          
        } catch (error) {
            console.log(error);
        } 

    }

    static async viewAccount() {
        const data = await AccountNonProfitModel.find();
        //   res.send(data);
        return data;
      }

}