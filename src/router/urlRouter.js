const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Url = require('../models/url');
const { create } = require('../models/user');
const {shortUrl, getAnalytic} = require('../controller/url.controller');

router.post("/", shortUrl);

router.get('/url/analytic/:shortId', getAnalytic);


module.exports = router
