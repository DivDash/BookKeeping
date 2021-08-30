const entries=require('../models/journal_entries_model')
const profit=require('../models/profit_model')
const AccountModel = require("../models/account_model.js");
module.exports = class JournalEntryService{
 
    
    static async validateProfitProject(data){
        try{

            console.log("here at validate project")
            let client=data[0].client;
            let project=data[0].project;
            console.log(client,project)    
            const query = { $and: [{ "Project":project }, { "Client": client }] }
            const projectExist = await profit.find( query )
            console.log(projectExist)
            return projectExist
        }
        catch(error){
            console.log(error)
        }
    }



    static async validateProject(data){
        try{
            
          
            const {project,client}=data    
            const query = { $and: [{ "Project":project }, { "Client": client }] }
            const projectExist = await profit.find( query )
            return projectExist
        }
        catch(error){
            console.log(error)
        }
    }



    static async validateAccount(data){
        try{

            let client=data[0].client;    
            const accountExist = await AccountModel.findOne({ name:client})
            return accountExist
        }
        catch(error){
            console.log(error)
        }
    }


    static async updateProfitProject(data,rev,exp){
        try{
        let client=data[0].client;
        let project=data[0].project

        const filter ={ $and: [{ Project:project }, { Client: client }] } ;
        const update = {Revenue:rev,Expense:exp};

        let doc = await profit.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true,
            rawResult: true 
          });
        }catch(error){
            conosle.log(error)
        }
    }



    static async updateAccount(data,bal){
    try {
        let client=data[0].client;

        const filterAccount = {name:client};
        const updateAccount = {Balance:bal};
    
        let docAcc = await AccountModel.findOneAndUpdate(filterAccount, updateAccount,{
          
            new: true,
            upsert: true,
            rawResult: true 

          
        });
    }
    catch(error){
        console.log(error)
    }
    }

    static async createJournalEntries(data){

        try{
            console.log(data,"at create journal")
            let saveEntries=await entries.insertMany(data)
            return saveEntries

        }
        catch(error){
            console.log(error)
        }
    }

    static async getJournalEntries(data){

        try{
            
            const {project,client}=data

            const queryEntry = { $and: [{ "project":project }, { "client": client }] }
            const entryExist = await entries.find( queryEntry )

            return entryExist

        }catch(eror){
            console.log(error)
        }
    }

    
}