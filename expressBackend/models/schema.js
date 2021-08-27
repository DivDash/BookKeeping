
const mongoose=require('mongoose')

const table=new mongoose.Schema({
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

    }
})

const user=mongoose.model('REGISTRATION',table)

module.exports=user
