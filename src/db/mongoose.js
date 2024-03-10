const mongoose = require('mongoose');

async function run() {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/url-short');
        
    }catch(error) {
        console.log(error)
    }   
}

run();