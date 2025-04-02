const shortid = require("shortid");
const urlmodel = require("../models/url");

async function handlePostShortID(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.json({ msg: "Url needed" });
    }
    const shortID = shortid();
    await urlmodel.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitedHistory: [],
        createdby:req.user._id,
    })
    return res.render("home.ejs", {
        id: shortID
    });
};

async function handleGetShortID(req, res) {
    const shortId = req.params.shortId;
    console.log("ShortId received:", shortId);

    try {
        const entry = await urlmodel.findOneAndUpdate(
            { shortId },
            { $push: { visitedHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!entry) {
            console.log("No entry found for ShortId:", shortId);
            return res.status(404).send("Short URL not found");
        }

        console.log("Redirecting to:", entry.redirectUrl);
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error in handleGetShortID:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleGetanalyticsShortID(req, res) {
    const shortId = req.params.shortId;
    const result = await urlmodel.findOne({ shortId });
    return res.json({
        totalClicks: result.visitedHistory.length, Analytics: result.visitedHistory,
    })
}


module.exports = {
    handlePostShortID,
    handleGetShortID,
    handleGetanalyticsShortID,
} 