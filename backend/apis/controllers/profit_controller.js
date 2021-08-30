'use strict';

const profitService=require('../services/profit_service')
const express = require("express");
const { createProfitProject } = require( '../services/profit_service' );
const router = express.Router();

module.exports = class Profit{
    
    static async createProfitProject(req,res,next){
    try{
      console.log("here at profitt")  
      let check=false;
      const{Project,Client,Receivable,Revenue,Expense,Date,Status}=req.body
      console.log(Project,Client,Receivable,Revenue,Expense,Date,Status)

      if (!Project || !Client || !Receivable || !Date || !Status) {
        check=true
        res.json({ message: "Fill The Full Form" });
      }

      const projectExist=await profitService.validateProfitProject(req.body)

      if(projectExist.length!==0){
        check=true
        res.json({message:"Project With This client Already Exist"})
      }

      if(check===false){

        let createProfit=await profitService.createProfitProject(req.body)
        res.json({ message: "Project with Client Added" });
      }

    }catch(error){
      console.log("here at error")
      res.send('error')
    }   
    }

    static async getProfitProject(req,res,next){
    try{
        let getProjects=await profitService.getProfitProject()
        res.send(getProjects)
        }
        catch(error){
            res.send(error)
        }
    }

}
