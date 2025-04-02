const express = require('express');
const router = express.Router();
const urlmodel = require("../models/url");
const { handlePostShortID, handleGetShortID, handleGetanalyticsShortID } = require("../controllers/url");

router.post("/", handlePostShortID);

router.get("/:shortId", handleGetShortID);

router.get("/analytics/:shortId", handleGetanalyticsShortID);


module.exports = router;