const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const {auth} = require('../middleware/auth');
const {getuser, loginuser, getloginuser, updateloginuser, deleteloginuser, signupuser} = require('../controller/user.controller');

router.post('/', signupuser)

// router.get('/user', getuser)

router.post('/login', loginuser)

// router.get('/user/me', auth, getloginuser);

// router.patch('/user/me', auth, updateloginuser)

// router.delete('/user/me', auth, deleteloginuser)

module.exports = router