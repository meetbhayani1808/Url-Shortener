const User = require('../models/user');

async function signupuser (req, res) {
    const {email, password} = req.body;
    
    try {
        await User.create({
            email,
            password
        })
        return res.redirect("/login");
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message});
    }
}

async function getuser (req,res) {
    try{
        const user =  await User.find({});

        console.log(`🚀 ~ router.get ~ user:`, user.password);


        res.status(200).json({
            user
        })
    }catch (e) {
        console.log(e);
        res.status(400).json({
            error: e.message
        })
    }
}

async function loginuser (req, res) {
    const {email, password} = req.body;
    try{
        const user = await User.findByCredential(email, password);
        const token = await user.generatejwttoken();
        res.cookie("uid", token);
        if(user) {
            return res.redirect("/")
        }
        // res.status(200).json({
        //     status: "sucess",
        //     user: user,
        //     token: token
        // })
    }catch (e) {
        console.log(e);
        res.status(400).json({
            error: e.message
        })
    }
}
async function getloginuser (req, res) {
    console.log(req.user)
    if(req.user !== undefined) {
        res.json({
            user: req.user
        })
    }
}

async function updateloginuser (req,res) {
    try {   
        const user = req.user
        user.email = req.body.email
        await user.save();
        res.json({
            user
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error:e
        })
    }
}

async function deleteloginuser (req, res) {
    try {
        const user = await User.findIdAndDelete(req.user.id);
        res.status(200).json({
            sucess: true,
            message: 'User delete Successfully',
            data: user
        })

    } catch (e) {
        res.status(400).json({
            error: e.message
        })
    }
}

module.exports =    {
    signupuser,
    getuser,
    loginuser,
    getloginuser,
    updateloginuser,
    deleteloginuser
    
}