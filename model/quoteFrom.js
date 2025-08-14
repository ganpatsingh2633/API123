const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    service:{
        type:String
    },
    message:{
        type:String
    }
});

const users = mongoose.model('quoteForm',user);
module.exports= users;
