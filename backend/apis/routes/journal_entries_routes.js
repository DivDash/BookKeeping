"use strict";
const express = require("express");
const router = express.Router();
const JournalEntries = require("../controllers/journal_entries_controller");

router.post("/createentries", JournalEntries.createJournalEntries);

router.post("/viewentry", JournalEntries.getJournalEntries);

module.exports = router;
