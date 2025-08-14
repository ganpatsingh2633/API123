const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    logintime: {
        type:Date,
        default:Date.now
    }
});

const users = mongoose.model('usersLoginInfo',user);
module.exports= users;
