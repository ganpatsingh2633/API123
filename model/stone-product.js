const mongoose = require('mongoose');

const user = new mongoose.Schema({
    title: {
        type:String
    },
    description:{
        type:String
    },
    sizes:{
        type:Array
    },
    image:{
        type:String
    },
    price: {
        type:String
    }
});

const users = mongoose.model('crusher-stone',user);
module.exports= users;
