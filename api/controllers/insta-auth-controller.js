var ig = require('instagram-node').instagram();
var config = require('../../configuration/instagram-configuration');
var jwtConfig = require('../../configuration/jwt-configuration');

var mongoose = require('mongoose');
var User = require('../models/userModel');

var jwt = require('jsonwebtoken');

ig.use({
    client_id: config.CLIENT_ID, 
    client_secret: config.CLIENT_SECRET
});

function authorizeUser(req, res) {
    res.json(ig.get_authorization_url(config.REDIRECT_URL, { scope: ['relationships']}));
}

function handleAuthorization(req, res) {
    ig.authorize_user(req.body.code, config.REDIRECT_URL, function(err, result) {
        if (err) {
            console.log(err);
            res.code = 400;
        } else {
            var authUser = new User({
                        username: result.user.username, 
                        bio: result.user.bio, 
                        profile_picture: result.user.profile_picture, 
                        full_name: result.user.full_name, 
                        insta_id: result.user.id, 
                        website: result.user.website, 
                        access_token: result.user.access_token
                    });

            var query = {'insta_id': result.user.id };
            
            User.find(query, function(err, user) {
                if (err) {
                    console.log(err);
                }

                if (user) {
                    authUser._id = user._id;
                }
            });

            User.findOneAndUpdate(query, authUser, {upsert: true}, function(err, user) {
                if (err) {
                    console.log(err);
                }

                var token = jwt.sign({userId: user._id}, jwtConfig.CLIENT_SECRET, {
                    expiresIn: '24h'
                });

                res.json({
                    success: true, 
                    body: user, 
                    token: token
                });
            });
        }
    })
}

exports.authorizeUser = authorizeUser;
exports.handleAuthorization = handleAuthorization;