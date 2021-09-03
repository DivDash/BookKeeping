"use strict";
const express = require("express");
const router = express.Router();
const JournalEntries = require("../controllers/journal_entries_controller");

router.post("/createentries", JournalEntries.createJournalEntries);

router.post("/updatejournalaccount", JournalEntries.updateJournalEntries);

router.post("/viewentry", JournalEntries.getJournalEntries);
router.get("/viewentryparams", JournalEntries.getJournalEntriesParams);
router.delete("/deleteentry", JournalEntries.deleteJournalEntry);

module.exports = router;
