const AccountModel = require("../models/account_model.js");
const entries = require("../models/journal_entries_model");
const profit = require("../models/profit_model");
const JournalEntryService = require("../services/journal_entries_service");

const bcrypt = require("bcrypt");
const { commonEmitter } = require("../../events");
const changeStream = AccountModel.watch();
changeStream.on("change", (data) => {
  AccountModel.find((err, doc) => {
    if (err) {
      console.log("error");

      commonEmitter.emit("view-account", {
        error: err.message,
      });
    } else {
      console.log("emit account");
      commonEmitter.emit("view-account", doc);
    }
  });
});
module.exports = class AccountService {
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

  
  static async update_accounts(data) {
    try {
      let acc_id = data._id;
      console.log("updateAccounts temp: " + acc_id);

      const findAccount = await AccountModel.findOne({ _id: data._id })
      console.log(findAccount,"old")
      let oldId=findAccount._id
      console.log(oldId,"oldName")

      const updated = await AccountModel.findOneAndUpdate(
        { _id: data._id },
        {
          name: data.name,
          Bank: data.Bank,
          Balance: data.Balance,
          Remarks: data.Remarks,
        }
      );
      
      const updateProfit= await profit.updateMany(
        {idClient:data._id},
        {Client:data.name}
     )

     const updateEntries= await entries.updateMany(
      {idClient:data._id},
      {client:data.name}
   )
   const updateEntriesRec= await entries.updateMany(
    {idRec:data._id},
    {receiver:data.name}
 )

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAccount(data) {
    try {
      console.log(data, "deleteee");

      // const deleteEntries = await entries.deleteMany({ client: data.name });
      // const deleteProjects = await profit.deleteMany({ Client: data.name });
      const deleteAccount = await AccountModel.deleteMany({ _id: data._id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getProjects(data) {
    try {
      console.log("error");
      const projects = await profit.find({ Client: data.name });
      return projects;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateAccounts(data) {
    try {
      console.log("updateAccounts", data);
      let project = data.Project;
      let client = data.Client;

      const queryEntry = { $and: [{ project: project }, { client: client }] };
      const entryExist = await entries.find(queryEntry);

      console.log(data, "updateRecieverAccount");

      let sum = 0;
      for (let i = 0; i < entryExist.length; i++) {
        sum = sum + entryExist[i].amount;
        const querry = await AccountModel.findOneAndUpdate(
          { name: entryExist[i].receiver },
          {
            $inc: { Balance: -entryExist[i].amount },
          },
          { new: true }
        );
      }

      const querryClient = await AccountModel.findOneAndUpdate(
        { name: client },
        {
          $inc: { Balance: sum },
        },
        { new: true }
      );

      return entryExist;
    } catch (error) {
      console.log(error);
    }
  }

  
  static async getRefrences(data) {
    try {
      console.log("at refrence");
      let ref=[]
      const projects = await profit.find({ idClient: data._id});
      const entry=await entries.find( { $or: [ {idClient :data._id}, { idRec:data._id} ] } )
      
      for(let i=0;i<projects.length;i++){
        if(ref.includes(projects[i].Project)===false){
          ref.push(projects[i].Project)
        }

      }

      for(let i=0;i<entry.length;i++){
        if(ref.includes(entry[i].project)===false){
          ref.push(entry[i].project)
        }
        
      }


      return ref;
    } catch (error) {
      console.log(error);
    }
  }


  

};
