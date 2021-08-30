const AccountNonProfitModel = require("../models/accountNonProfitModel.js");
const bcrypt = require("bcrypt");
const  { commonEmitter } = require('../../events')
const changeStream = AccountNonProfitModel.watch();
changeStream.on('change', (data) => {
    AccountNonProfitModel.find((err, doc) => {
      if (err) {
        console.log("error")
  
        commonEmitter.emit("view-account-non-profit", {
          error: err.message
        })
      } else {
        console.log("emit")
        commonEmitter.emit("view-account-non-profit", doc )
      }
    });
})
module.exports = class AccountNonProfitService{
    
    // static async changeWatch(){
    //     changeStream.on('change', (data) => {
    //         AccountsNonProfit.find((err, doc) => {
    //           if (err) {
    //             console.log("error")
          
    //             commonEmitter.emit("view-account-non-profit", {
    //               error: err.message
    //             })
    //           } else {
    //             console.log("emit")
    //             commonEmitter.emit("view-account-non-profit", doc )
    //           }
    //         });
    // })
    // };

    static async createAccountService(Name,Expense,Remarks){
        try {
            console.log("error")
            const saving = new AccountNonProfitModel({ Name, Expense, Remarks });
          await saving.save();
          
        } catch (error) {
            console.log(error);
        } 

    }
    static async viewAccountService(){
        try {
            const data = await AccountNonProfitModel.find();
            return data          
        } catch (error) {
            console.log(error);
        } 

    }

    // static async loginAdmin(Email,Password){
    //     try {
    //         const response = await adminModel.findOne({ email: Email });
    //       if (response) {
            
    //         const match = await bcrypt.compare(Password, response.password);
    //         const token = await response.generateauthtoken();
    //         return {match, token};
    //       }
    //     } catch (error) {
    //         console.log(`user not found. ${error}`)
    //     }
    // }

    // static async updateAdmin(title, body, AdminImage){
    //         try {
    //             const updateResponse =  await Admin.updateOne(
    //                 {title, body, AdminImage}, 
    //                 {$set: {date: new Date.now()}});

    //                 return updateResponse;
    //         } catch (error) {
    //             console.log(`Could not update Admin ${error}` );

    //     }
    // }

    // static async deleteAdmin(AdminId){
    //     try {
    //         const deletedResponse = await Admin.findOneAndDelete(AdminId);
    //         return deletedResponse;
    //     } catch (error) {
    //         console.log(`Could  ot delete Admin ${error}`);
    //     }

    // }
}