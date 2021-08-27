const mongoose=require('mongoose')
const Profit=new mongoose.Schema({
    Project:{
        type:String,
        required:true

    },
    Client:{
        type:String,
        required:true

    },
    Receivable:{
        type:Number,
        required:true

    },
    Revenue:{
        type:Number,
        required:true

    },
    Expense:{
        type:Number,
        required:true
    },
    Date:{
       type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    }
})

const profit=mongoose.model('Profit',Profit)
module.exports=profit