const Url = require('../models/url');
const urlRouter = require('../router/urlRouter');
const shortid = require('shortid');

async function shortUrl (req, res) {
    const body = req.body;
    if(!body.url) {
        res.status(400).json({
            message: 'url is require!'
        })
    }
    try {
        const shortId = shortid.generate();
        await Url.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
            createBy:req.user._id
        })
        return res.render("home", {
            id: shortId,
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error : e.message
        })
    }
    
}

async function getAnalytic (req, res) {
    const shortId = req.params.shortId ;
    const result = await Url.findOne({ shortId });
    res.status(200).json({
        totalCount: result.visitHistory.length,
        analytics: result.visitHistory 
    })
}

module.exports = {
    shortUrl,
    getAnalytic
}