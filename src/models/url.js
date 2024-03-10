const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema( {
    shortId: {
        type: String,
        require: true,
        unique: true
    },
    redirectUrl : {
        type: String
    },
    visitHistory : [{ timestamp: { type: String } }],
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Url =  mongoose.model('Url', urlSchema);

module.exports = Url