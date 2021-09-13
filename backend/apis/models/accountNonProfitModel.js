const mongoose = require("mongoose");
const AccountNonProfit = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Expense: {
    type: Number,
    required: true,
  },
  Remarks: {
    type: String,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
});

const AccountNonProfitModel = mongoose.model("AccountsNonProfit", AccountNonProfit);
module.exports = AccountNonProfitModel;
