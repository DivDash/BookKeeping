const jwt=require('jsonwebtoken')
const user=require('../models/schema')
const cookieParser = require('cookie-parser');

const Authenticate=async(req,res,next)=>{
    try
    {
    const token=req.cookies.Book
    const infos=jwt.verify(token,"Book")
    const rootuser=await user.findOne({_id:infos._id,"tokens.token":token})
    if(!rootuser){
        res.status(422).json({error:"error"})
    }
    req.token=token
    req.rootuser=rootuser
    req.userID=rootuser._id
    next()
    }catch(error){
        console.log(error)
        res.status(422).json({error:"error"})
    }

}

module.exports=Authenticate