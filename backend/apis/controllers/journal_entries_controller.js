

'use strict';
const JournalEntryService=require('../services/journal_entries_service')
const express = require("express");
const router = express.Router();



module.exports = class JournalEntries{

    static async createJournalEntries(req,res,next){
//non-client

        try{
            console.log("1")
            console.log(req.body)
            console.log(req.body.newDivs,"data")
            let data=req.body.newDivs
            console.log(req.body.option,"option")
            let option=req.body.option

            let check=false
            let projectExist=await JournalEntryService.validateProfitProject(data)
            console.log(projectExist,"hellooo")

            if(projectExist.length===0){
              console.log("2")
              check=true
              res.json({message:"Project with This Client Dosent exist"})
            }
            
          
            if(check===false){
            console.log("3")
            const accountExist = await JournalEntryService.validateAccount(data)
      
            let sum=0
            for(let i=0;i<data.length;i++)
            {
              sum=sum + data[i].amount
            }
            let exp=projectExist[0].Expense+sum
            let rec=projectExist[0].Receivable-sum
            let rev=projectExist[0].Revenue+sum



        
            console.log(exp,"revExp")

            if(option==="non-client"){
            const updateProfit=await JournalEntryService.updateProfitProject(data,exp)
            }


            if(option==="client"){
              const updateProfit=await JournalEntryService.updateClientProfitProject(data,rec,rev)
              }
  
            
           
        
            let bal=accountExist.Balance-sum
        
            let updateAccount=await JournalEntryService.updateAccount(data,bal)
            
            let awain=accountExist.Balance-69

            let updateRecieverAccount=await JournalEntryService.updateReceiverAccount(data)

            let awain2=accountExist.Balance-69

            const saveEntries=await JournalEntryService.createJournalEntries(data)
            
            res.json({message:"Entries are added"})

            }
            
            }
            catch(error){
              console.log("4") 
              res.json({message:'error'})
            }
        


    }




    static async getJournalEntries(req,res,next){


        try{
            console.log("here at viewEntry")
            let check=false
            // let data = {client:"Zain",project:"FinalProj"}

            let projectExist=await JournalEntryService.validateProject(req.body)
      
            if(projectExist.length===0){
            check=true  
            res.json({message:"Project With The Non-Client Is Selected"})
              }
      
           if(check===false){
      
            console.log(projectExist)

           let getEntries=await JournalEntryService.getJournalEntries(req.body)


            res.json({message:"Success",getEntries})
            }
      
          }catch(error){
            res.send('error')
          }

        

    }
    static async getJournalEntriesParams(req,res,next){


      try{
          console.log("here at viewEntry")
          let check=false
          console.log(req.query.project)
          let data = {project:req.query.project}
          let projectExis=await JournalEntryService.validateProject(data)
    
          if(projectExis.length===0){
          check=true  
          res.json({message:"Project With The Non-Client Is Selected"})
            }
    
         if(check===false){
    
          console.log(projectExis)

         let getEntrie=await JournalEntryService.getJournalEntries(data)

        let objectEntries={
          getEntries:getEntrie,
          projectExist:projectExis
        }

          //  res.json({message:"Success",getEntries})
          console.log(objectEntries,"objectEntries")
          res.send(objectEntries)
          }
    
        }catch(error){
          res.send('error')
        }

      

  }

  
  static async deleteJournalEntry(req, res, next) {
    try {
      
      console.log("delete entryy")
      let data=[]
      let option;
      data[0]=req.body
      const project=await JournalEntryService.validateProfitProject(data)  
      console.log(project,"project")
      console.log(project[0].Client,"project.Client")
      console.log(req.body.client,"req.body.client")
      let projClient=project[0].Client

      if(projClient===req.body.client){
        option="client"
      }
      else{
        option="non-client"
      }
      
      let object={
        entries:req.body,
        option:option
      }


      const deleteEntry=await JournalEntryService.deleteEntry(object)

      res.json({message:"Entry deleted"});
    } catch (error) {
      res.send("there is error");
    }
  }
  

  static async updateJournalEntries(req, res, next) {
    try {
      console.log("mubashir account updateING:");
      console.log(req.body);

      const updateAccounts = await JournalEntryService.update_journal_accounts(
        req.body
      );
      res.json({ message: "account updatedd" });
    } catch (error) {
      res.send("there is error");
    }
  }
  
  
  


}



