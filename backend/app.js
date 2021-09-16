const express = require("express");
const app = express();
const dotenv = require("dotenv");
cors = require("cors");
bodyParser = require("body-parser");
const hostname = "localhost";
const http = require("http");
const { commonEmitter } = require("./events");

dotenv.config({ path: "./confing.env" });
require("./DB/configdb");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.listen(PORT, () => {
//   console.log("listenig at ", PORT);
// });
app.use(require("./apis/routes/adminRoute"));
app.use(require("./apis/routes/accountNonProfitRoute"));
app.use(require("./apis/routes/profit_route"));
app.use(require("./apis/routes/account_Route"));
app.use(require("./apis/routes/journal_entries_routes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const server = http.createServer(app).listen(PORT, () => {
  console.log("Server is running at", { PORT });
});
// console.log("Sadassa", server);
const io = require("socket.io")(server, {
  cors: {
    // origin: "http://localhost:4200",
    origin: "https://book-keeping-b571f.web.app",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  commonEmitter.on("view-account-non-profit", function (data) {
    socket.broadcast.emit("viewaccountnonprofit-data", data);
  });
  commonEmitter.on("view-account", function (data) {
    socket.broadcast.emit("viewaccount-data", data);
  });
  commonEmitter.on("view-account-profit", function (data) {
    socket.broadcast.emit("viewaccountprofit-data", data);
  });
  commonEmitter.on("view-profit", function (data) {
    socket.broadcast.emit("viewprofit-data", data);
  });
  commonEmitter.on("accounts", function (data) {
    socket.broadcast.emit("accounts-data", data);
  });
  commonEmitter.on("view-entry", function (data) {
    socket.broadcast.emit("viewentry-data", data);
  });
  commonEmitter.on("view-entry-params", function (data) {
    socket.broadcast.emit("viewentryparams-data", data);
  });
  commonEmitter.on("Logout-params", function (data) {
    socket.broadcast.emit("Logout-data", data);
  });
  console.log("Listener connected");
});
module.exports = app;
