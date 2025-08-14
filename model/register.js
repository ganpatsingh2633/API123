const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword: {
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    }
}, {timestamps : true});

const users = mongoose.model('users',user);
module.exports= users;
