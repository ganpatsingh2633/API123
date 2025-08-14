const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type:String
    },
    position:{
        type:String
    },
    experience:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
});

const users = mongoose.model('stoneTeam',user);
module.exports= users;
