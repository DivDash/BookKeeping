"use strict";
const express = require("express");
const router = express.Router();
const JournalEntries = require("../controllers/journal_entries_controller");

router.post("/createentries", JournalEntries.createJournalEntries);

router.get("/viewentry", JournalEntries.getJournalEntries);
router.get("/viewentryparams", JournalEntries.getJournalEntriesParams);

module.exports = router;
