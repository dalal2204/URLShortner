const express = require('express');
const router = express.Router();
const urlmodel = require("../models/url");


router.get("/", async (req, res) => {
    if (!req.user) { return res.redirect('/login'); }
    let allURL = [];
    if (req.user) {
        allURL = await urlmodel.find({createdby:req.user._id});
    }
    return res.render("home.ejs", {
        url: allURL,
    });
});

router.get("/signin", (req, res) => {
    return res.render("signup.ejs");
})

router.get("/login", (req, res) => {
    return res.render("login.ejs");
})

router.get("/forgot",(req,res)=>{
    return res.render("forgotpass.ejs");
})

router.get("/update",(req,res)=>{
    return res.render("updatepass.ejs");
})

module.exports = router;