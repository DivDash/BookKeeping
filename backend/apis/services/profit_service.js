const AccountProfitModel = require("../models/profit_model");
const entries=require('../models/journal_entries_model')
const profit=require('../models/profit_model')

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
      console.log("emit service");
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


  static async deleteProject(data) {
    try{
    console.log(data,"deleteee from profitt")  

    const deleteEntries= await entries.deleteMany({$and: [{ "project": data.Project }, { "client":data.Client}]});
    const deleteProject= await profit.deleteMany({Project:data.Project});    
    return data;
  }catch(error){
    console.log(error)
  }

  }

};
