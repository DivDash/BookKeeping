'use strict';
const JournalEntryService=require('../services/journal_entries_service')
const express = require("express");
const router = express.Router();



module.exports = class JournalEntries{

    static async createJournalEntries(req,res,next){

        try{
            console.log("1")
            console.log(req.body)
            let check=false
            let projectExist=await JournalEntryService.validateProfitProject(req.body)
            console.log(projectExist,"hellooo")

            if(projectExist.length===0){
              console.log("2")
              check=true
              res.json({message:"Project with This Client Dosent exist"})
            }
            
          
            if(check===false){
            console.log("3")
            const accountExist = await JournalEntryService.validateAccount(req.body)
      
            let sum=0
            for(let i=0;i<req.body.length;i++)
            {
              sum=sum + req.body[i].amount
            }
            let exp=projectExist[0].Expense+sum
            let rev=projectExist[0].Receivable-exp;
            
        
            console.log(rev,exp,"revExp")

            const updateProfit=await JournalEntryService.updateProfitProject(req.body,rev,exp)
           
        
            let bal=accountExist.Balance-sum
        
            let updateAccount=await JournalEntryService.updateAccount(req.body,bal)
            
            let awain=accountExist.Balance-69

            let updateRecieverAccount=await JournalEntryService.updateReceiverAccount(req.body)

            let awain2=accountExist.Balance-69

            const saveEntries=await JournalEntryService.createJournalEntries(req.body)
            
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
            let data = {client:"Zain",project:"FinalProj"}

            let projectExist=await JournalEntryService.validateProject(data)
      
            if(projectExist.length===0){
            check=true  
            res.json({message:"Project with This Client Dosent exist"})
              }
      
           if(check===false){
      
            console.log(projectExist)

           let getEntries=await JournalEntryService.getJournalEntries(data)


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
          console.log(req.query.client,req.query.project)
          let data = {client:req.query.client,project:req.query.project}
          let projectExist=await JournalEntryService.validateProject(data)
    
          if(projectExist.length===0){
          check=true  
          res.json({message:"Project with This Client Dosent exist"})
            }
    
         if(check===false){
    
          console.log(projectExist)

         let getEntries=await JournalEntryService.getJournalEntries(data)


          //  res.json({message:"Success",getEntries})
          res.send(getEntries)
          }
    
        }catch(error){
          res.send('error')
        }

      

  }


}