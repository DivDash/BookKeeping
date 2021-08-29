'use strict';
const  express =  require("express");
const router = express.Router();
const JournalEntries=require('../controllers/journal_entries_controller')

router.post('/Entries',JournalEntries.createJournalEntries)

router.post('/ViewEntry',JournalEntries.getJournalEntries)


module.exports =  router;


