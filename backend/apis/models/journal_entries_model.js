const mongoose=require('mongoose')
const entry=new mongoose.Schema({
    project:{
        type:String,
        required:true

    },
    client:{
        type:String,
        required:true

    },
    receiver:{
        type:String,
        required:true

    },
    amount:{
        type:Number,
        required:true

    },
    reason:{
        type:String,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

const entries=mongoose.model('Entries',entry)
module.exports=entries