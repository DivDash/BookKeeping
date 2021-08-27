const moongose=require('mongoose');

const DB='mongodb+srv://zain:zain@cluster0.mdpdb.mongodb.net/Angular?retryWrites=true';
console.log(DB)

moongose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection succesfull")
})
.catch((err)=>{
    console.log(err);
})