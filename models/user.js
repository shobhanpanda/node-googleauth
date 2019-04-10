require('../db/mongoose')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    googleId: String
});

const User =  mongoose.model('User', userSchema)


module.exports=User
