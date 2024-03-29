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
      const {Project} = data;

      const query ={ Project: Project };
      const projectExist = await AccountProfitModel.find(query);

      return projectExist;
    } catch (error) {
      console.log(error);
    }
  }

  static async createProfitProject(data) {
    try {
      const { Project,idClient, Client, Receivable, Revenue, Expense, Date, Status } =
        data;

      let newProfitProject = {
        Project,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
        idClient
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

    const deleteProject= await profit.deleteMany({Project:data.Project});    
    return data;
  }catch(error){
    console.log(error)
  }

  }

  static async update_profit_accounts(data) {
    try {
      let acc_id = data._id;
      console.log("updateAccounts temp: " + acc_id);

      const findProject = await profit.findOne({ _id: data._id })
      console.log(findProject,"old")
      let oldProject=findProject.Project
      let oldClient=findProject.client
      console.log(oldProject,"oldName")




      const updated = await profit.findOneAndUpdate(
        { _id: data._id },
        {
          Project: data.Project,
          Client:data.Client,
          idClient:data.idClient,
          Receivable: data.Receivable,
          Revenue: data.Revenue,
          Expense: data.Expense,
          Date: data.Date,
          Status: data.Status,
        }
      );

      const updateEntries= await entries.updateMany(
        {project:oldProject },
        {project:data.Project}
     )

      console.log(data);

      }catch(error){
        console.log(error)
      }
    }


};
