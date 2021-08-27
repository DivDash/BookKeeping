const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const user = require("../models/schema");
const AccountModel=require("../models/Account")
const AccountsNonProfit=require("../models/AccountNonProfit")
const profit=require("../models/Project")
const Entry=require("../models/JournalEntries")
const Authenticate = require("../middlewares/Authenticate");




router.post("/registration", async (req, res) => {
  try {
    let check = false;
    const { name, email, password, confirm, phone, work } = req.body;

    if (!name || !email || !password || !confirm || !phone || !work) {
      check = true;
      res.json({ message: "Fill The Full Form" });
    }
    if (password !== confirm) {
      check = true;
      res.json({ message: "Confirm Password Dosen't Match" });
    }
    const userexist = await user.findOne({ email: email });
    if (userexist) {
      check = true;
      res.json({ message: "Email Already Exist" });
    }

    if (check === false) {
      console.log("here at saving");
      const saving = new user({ name, email, password, confirm, phone, work });
      await saving.save();
      res.json({ message: "Registered Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send("there is error");
  }
});

router.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.json({ message: "Fill The Full Form" });
    } else {
      const userexist = await user.findOne({ email: email });
      if (userexist) {
        const match = await bcrypt.compare(password, userexist.password);
        const token = await userexist.generateauthtoken();
        res.cookie("Book", token, {
          expires: new Date(Date.now() + 864000000),
          httpOnly: false,
        });

        if (match) {
          res.json({ message: "loggin succesfully" });
        }
        if (!match) {
          res.json({ message: "Invalid Credentials" });
        }
      }
    }
  } catch (err) {
    res.send("notokk");
  }
});

router.get("/Getinfo", Authenticate, (req, res) => {
  res.send(req.rootuser);
});


router.get( '/Logout', ( req, res ) => {
    res.clearCookie( 'Book', { path: '/' } )
    res.status( 200 ).json( { message: "success" } )
} )



router.post("/account", async (req, res) => {
    try {
      let check = false;
      const {name,Bank,Balance,Remarks} = req.body;
      if (!name || !Bank || !Balance || !Remarks) {
        check = true;
        res.json({ message: "Fill All The Fields" });
      }
      if (check === false) {
        const saving = new AccountModel({name,Bank,Balance,Remarks});
        await saving.save();
        res.json({ message: "Account Added" });
      }
    } catch (err) {
      console.log(err);
      res.send("there is error");
    }
  });


  router.get( '/ViewAccount',async ( req, res ) => {
    try{
        const data = await AccountModel.find()
        res.send( data )
    }catch(error){
      res.send("there is error");
    }
  });



  router.post('/Profit',async ( req, res ) => {
    try{
      check=false;
      console.log("here at profitt")
      const{Project,Client,Receivable,Revenue,Expense,Date,Status}=req.body
      console.log(Project,Client,Receivable,Revenue,Expense,Date,Status)
      const query = { $and: [{ "Project":Project }, { "Client": Client }] }
      const ProjectExist = await profit.find( query )

      if (!Project || !Client || !Receivable || !Date || !Status) {
       
        check=true
        res.json({ message: "Fill The Full Form" });
      }

      if(ProjectExist.length!==0){
        check=true
        res.json({message:"Project With This client Already Exist"})
      }

      if(check===false){
        const saving = new profit({Project,Client,Receivable,Revenue,Expense,Date,Status});
        await saving.save();
        res.json({ message: "Project with Client Added" });
      }


    }catch(error){
      console.log("here at error")
      res.send('error')
    }
  })




  router.post('/Entries', async ( req, res ) => {
  try{
    console.log("1")
    console.log(req.body)
    check=false
    client=req.body[0].client;
    project=req.body[0].project;
    const query = { $and: [{ "Project":project }, { "Client": client }] }
    const ProjectExist = await profit.find( query )
    console.log(ProjectExist,"hellooo")
    if(ProjectExist.length===0){
      console.log("2")
      check=true
      res.json({message:"Project with This Client Dosent exist"})
    }
    if(check===false){
    console.log("3")
    const accountExist = await AccountModel.findOne({ name:client})
    console.log(accountExist,"account")

    sum=0
    for(let i=0;i<req.body.length;i++)
    {
      sum=sum + req.body[i].amount
    }
    exp=ProjectExist[0].Expense+sum
    rev=ProjectExist[0].Receivable-exp;
    

    console.log(rev,exp,"revExp")
    const filter ={ $and: [{ Project:project }, { Client: client }] } ;
    const update = {Revenue:rev,Expense:exp};

    bal=accountExist.Balance-sum
    console.log(bal,"balance")
    const filterAccount = {name:client};
    const updateAccount = {Balance:bal};
  
    let doc = await profit.findOneAndUpdate(filter, update,{
      new: true,
      upsert: true,
      rawResult: true 
    });

    let docAcc = await AccountModel.findOneAndUpdate(filterAccount, updateAccount,{
      
        new: true,
        upsert: true,
        rawResult: true 
      
    });

    const saving=await Entry.insertMany(req.body)
    res.json({message:"Entries are added"})
    }
    }
    catch(error){
      console.log("4") 
      res.json({message:'error'})
    }

  })


  router.post('/ViewEntry',async(req,res)=>{
    try{
      console.log("here at viewEntry")
      check=false
      const {project,client}=req.body
      console.log(project,client)
      const query = { $and: [{ "Project":project }, { "Client": client }] }
      const ProjectExist = await profit.find( query )

      if(ProjectExist.length===0){
      check=true  
      res.json({message:"Project with This Client Dosent exist"})
        }

     if(check===false){

      console.log(ProjectExist)
      const queryEntry = { $and: [{ "project":project }, { "client": client }] }
      const entryExist = await Entry.find( queryEntry )
      console.log(entryExist)
      res.json({message:"Success",entryExist})
      }

    }catch(error){
      res.send('error')
    }
  })


  router.get( '/ViewProfit',async ( req, res ) => {
    try{
        const data = await profit.find()
        res.send( data )
    }catch(error){
      res.send("there is error");
    }
  });

  router.post("/accountnonprofit", async (req, res) => {
    try {
      let check = false;
      const { Name, Expense, Remarks } = req.body;
      if (!Name || !Expense || !Remarks) {
        check = true;
        res.json({ message: "Fill All The Fields" });
      }
      if (check === false) {
        const saving = new AccountsNonProfit({ Name, Expense, Remarks });
        await saving.save();
        res.json({ message: "Account Added" });
      }
    } catch (err) {
      console.log(err);
      res.send("there is error");
    }
  });
  router.get("/ViewAccountNonProfit", async (req, res) => {
    try {
      const data = await AccountsNonProfit.find();
      res.send(data);
    } catch (error) {
      res.send("there is error");
    }
  });
  
  


module.exports = router;
