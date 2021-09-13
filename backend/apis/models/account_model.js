const mongoose=require('mongoose')
const Account=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    Bank:{
        type:String,
        required:true

    },
    Balance:{
        type:Number,
        required:true

    },
    Remarks:{
        type:String,
        required:true

    }
})

const AccountModel=mongoose.model('Accounts',Account)
module.exports=AccountModel