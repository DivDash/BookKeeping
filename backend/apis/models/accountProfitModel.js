const mongoose = require("mongoose");
const AccountProfit = new mongoose.Schema({
  Client: {
    type: String,
    required: true,
  },
  Project: {
    type: String,
    required: true,
  },
  Receivable: {
    type: Number,
    required: true,
  },
  Revenue: {
    type: Number,
    required: true,
  },
  Expense: {
    type: Number,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const AccountsProfit = mongoose.model("AccountsProfit", AccountProfit);
module.exports = AccountsProfit;
