const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { use } = require('../router/staticRouter');

const auth = async function(req,res,next) {
        try {
            const token = req.cookies?.uid;

            console.log(`🚀 ~ auth ~ token:`, token)

            if(!token){
                return res.redirect("/login")
            }
                const decode = jwt.verify(token,'1808')
                const user = await User.findOne({ _id: decode._id})
                if(!user) return res.redirect("/login");
                req.user = user
            next();

        }catch (e) {
            console.log('error:',e);
            res.status(400).json({
                error:e.message
            })
        }
}

const checkAuth = async function (req,res,next) {
    const token = req.cookies?.uid;
    console.log(`🚀 ~ checkAuth ~ token:`, token)
    if(token) {
        const decode = jwt.verify(token,'1808')
        const user = await User.findOne({ _id: decode._id})
        req.user = user
    }
    next();
}

module.exports = {
    auth,
    checkAuth
}