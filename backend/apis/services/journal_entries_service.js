const entries=require('../models/journal_entries_model')
const profit=require('../models/profit_model')
const AccountModel = require("../models/account_model.js");


const { commonEmitter } = require("../../events");
let queryEntryGlobal;
const changeStream = entries.watch();
changeStream.on("change", (data) => {
    // const entryExist = entries.find( queryEntryGlobal )

    // console.log("on",entryExist )
  entries.find(queryEntryGlobal,(err, doc) => {
    if (err) {
      console.log("error");

      commonEmitter.emit("view-entry-params", {
        error: err.message,
      });
    } else {
      console.log("emit 66");
      commonEmitter.emit("view-entry-params", doc);
    }
  });
});

module.exports = class JournalEntryService{
 
    
    static async validateProfitProject(data){
        try{

            console.log("here at validate project")
            let project=data[0].project;  
            const query = {"Project":project}
            const projectExist = await profit.find( query )
            console.log(projectExist,"projService")
            return projectExist
        }
        catch(error){
            console.log(error)
        }
    }



    static async validateProject(data){
        try{
            
            console.log("here at validate project")
            console.log(data,"qqqqqqqqqqqqqqq")
            const {project}=data
            console.log(project)    
            const query = { "Project":project }
            const projectExist = await profit.find( query )
            console.log(projectExist)
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


    static async updateProfitProject(data,exp){
        try{
            console.log("helllo")
        let project=data[0].project

        const filter ={ Project:project }  ;
        const update = {Expense:exp};

        let doc = await profit.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true,
            rawResult: true 
          });
        }catch(error){
            conosle.log("update profit error",error)
        }
    }


    static async updateClientProfitProject(data,rec,rev){
        try{
            console.log("helllo")
        let project=data[0].project

        const filter ={ Project:project }  ;
        const update = {Receivable:rec,Revenue:rev};

        let doc = await profit.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true,
            rawResult: true 
          });
        }catch(error){
            conosle.log("update profit error",error)
        }
    }



    static async updateAccount(data,bal){
    try {

        console.log("update account")
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
        console.log("update account error")
        console.log(error)
    }
    }

    static async createJournalEntries(data){

        try{

            let saveEntries=await entries.insertMany(data)
            return saveEntries

        }
        catch(error){
            console.log(error)
        }
    }

    static async getJournalEntries(data){

        try{
            
            console.log(data, "aaaa")
            const {project}=data

            queryEntryGlobal = {"project":project}
            const entryExist = await entries.find( queryEntryGlobal )
            console.log(entryExist,"entrieeeeeessssssss")
            return entryExist

        }catch(eror){
            console.log(error)
        }
    }

    static async updateReceiverAccount(data){
        try {    
          console.log(data,"updateRecieverAccount")  

          for(let i=0;i<data.length;i++){
          const querry = await AccountModel.findOneAndUpdate(
            { name:data[i].receiver }, 
            { 
               $inc: { Balance:data[i].amount } 
            }, {new: true })
          }
        }
        catch(error){
            console.log(error)
        }
    }



    static async deleteEntry(object){
        try {    

          let data=object.entries
          let option=object.option  
          console.log(data,"deleteEntry")
          console.log(option,"option")  
          
          const querry = await AccountModel.findOneAndUpdate(
            { name:data.receiver }, 
            { 
               $inc: {Balance: -data.amount } 
            }, {new: true })

            const querryClient = await AccountModel.findOneAndUpdate(
                { name:data.client}, 
                { 
                   $inc: {Balance: data.amount  } 
                }, {new: true })


                if(option==="non-client")
                {

                    console.log("non-client service")    
                    const querryProfit = await profit.findOneAndUpdate(
                    { Project:data.project}, 
                    {  
                       $inc:{Expense: -data.amount} 
                    }, {new: true })  
                }

                if(option==="client"){
                    console.log("client service")
                    const querryProfitRev = await profit.findOneAndUpdate(
                        { Project:data.project}, 
                        { 
                           $inc: {Revenue:-data.amount} 
                  
                        }, {new: true })   
                        
                        const querryProfitRec = await profit.findOneAndUpdate(
                            { Project:data.project}, 
                            { 
                               $inc: {Receivable:data.amount} 
                      
                            }, {new: true })     

                    }

                const deleteEntries= await entries.deleteOne({client:data.client,
                    amount:data.amount,
                    project:data.project,
                    receiver:data.receiver,
                    reason:data.reason,
                    method:data.method,
                    remarks:data.remarks,
                    date:data.date});   
                    
                return deleteEntries
        }
        catch(error){
            console.log(error)
        }
    }

    
}