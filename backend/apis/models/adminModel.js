'use strict';
const mongoose=require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


let Admin=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    confirm:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true

    },
    work:{
        type:String,
        required:true

    },
    tokens:[
        {   
            token:{
            type:String,
            required:true

        }
    }
    ]

})
Admin.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
        this.confirm=await bcrypt.hash(this.confirm,10)
    }
    next()

})


Admin.methods.generateauthtoken=async function (){
    try{
        let token=jwt.sign({_id:this._id},"Book")
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token

    }catch(err){
        consol.log(err)
    }
    

}

const adminModel = mongoose.model("REGISTRATION", Admin);
module.exports = adminModel