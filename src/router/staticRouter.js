const express = require('express');
const Url = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("user:",req.user)
    if(!req.user) return res.redirect("/login"); 

    const allurls = await Url.find({createBy: req.user._id});

    console.log(`🚀 ~ router.get ~ allurls:`, allurls)

    return res.render("home", {
        urls: allurls,
    });
})

router.get("/signup", async (req, res) => {
    return res.render("signup")
})

router.get("/login", async (req, res) => {
    return res.render("login")
})
module.exports = router;