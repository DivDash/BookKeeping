const express=require('express');
const dotenv=require('dotenv')
cors = require('cors');
bodyParser = require('body-parser')
const app=express();
dotenv.config({ path:'./confing.env'})
require('./DB/configdb')


const hostname = "localhost";
const http = require("http");
const { commonEmitter } = require('./events')
const cookieParser =require('cookie-parser');
app.use(cors({origin:true, credentials:true})) 
const PORT=5000
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())
app.use(require('./routes/routing'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.listen(PORT,()=>{
//     console.log("listenig at ",PORT);
// });
const server = http.createServer(app).listen(PORT, hostname, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket)=>{
    commonEmitter.on('view-account-non-profit', function (data) {
      socket.broadcast.emit('viewAccountNonProfit', data)
    });
    // commonEmitter.on('journalData', function (data) {
    //   socket.broadcast.emit('journal-entries-data', data)
    // });
    // commonEmitter.on('voucherData', function (data) {
    //   socket.broadcast.emit('voucher-data', data)
    // });
    // commonEmitter.on('bankData', function (data) {
    //   socket.broadcast.emit('bank-data', data)
    // });
    // commonEmitter.on('projectData', function (data) {
    //   socket.broadcast.emit('projects-data', data)
    // });
    // commonEmitter.on('nonProfitData', function (data) {
    //   socket.broadcast.emit('non-profit-data', data)
    // });
    // commonEmitter.on('entryTypeData', function (data) {
    //   socket.broadcast.emit('entries-data', data)
    // });
    console.log('Listener connected');
  })