'use strict';
const  express =  require("express");
const router = express.Router();
const profitController=require('../controllers/profit_controller')

router.post('/Profit', profitController.createProfitProject)

router.get( '/ViewProfit',profitController.getProfitProject);

module.exports =  router;