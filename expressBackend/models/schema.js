
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


table.methods.generateauthtoken=async function (){
    try{
        let token=jwt.sign({_id:this._id},'BookKeeping')
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token

    }catch(err){
        consol.log(err)
    }
    

}


const user=mongoose.model('REGISTRATION',table)

module.exports=user
