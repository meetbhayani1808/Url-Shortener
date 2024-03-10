const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema( {
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userschema.pre('save', async function (next) {
    const user = this;

    console.log(`🚀 ~ user:`, user)

  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();

});

userschema.statics.findByCredential=  async function (email,password) {
    
    const user = await User.findOne({ email });
    if(!user) {
      throw new Error('email is not found');
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('password is incorrect');
    }else{
        return user;
    }
}

userschema.methods.generatejwttoken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, '1808');
    return token;
} 

const User = mongoose.model('User', userschema)

module.exports = User;