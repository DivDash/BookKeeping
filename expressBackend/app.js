const express=require('express');
const dotenv=require('dotenv')
cors = require('cors');
bodyParser = require('body-parser')
const app=express();
dotenv.config({ path:'./confing.env'})
require('./DB/configdb')
const cookieParser =require('cookie-parser');
app.use(cors({origin:true, credentials:true})) 
const PORT=5000
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())
app.use(require('./routes/routing'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log("listenig at ",PORT);
});