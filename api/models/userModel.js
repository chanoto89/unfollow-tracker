var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String,
    username: String, 
    bio: String, 
    profile_picture: String, 
    full_name: String, 
    insta_id: String, 
    website: String,
    access_token: {
        type: String, 
        select: false   
    }, 
    jwt_expires: {
        type: Date, 
        default: new Date(+new Date() + 24*60*60*1000)
    },
    created_date: {
        type: Date, 
        default: Date.now
    }
});

userSchema.methods.toJSON
module.exports = mongoose.model('User', userSchema);