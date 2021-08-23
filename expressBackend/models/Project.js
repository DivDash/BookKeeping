const mongoose=require('mongoose')
const Project=new mongoose.Schema({
    project:{
        type:String,
        required:true

    },
    client:{
        type:String,
        required:true

    },
    receivable:{
        type:Number,
        required:true

    },
    revenue:{
        type:Number,
        required:true

    },
    expense:{
        type:Number,
        required:true
    },
    datee:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const ProjectModel=mongoose.model('Project',Project)
module.exports=ProjectModel