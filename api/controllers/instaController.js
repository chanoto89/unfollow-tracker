var ig = require('instagram-node').instagram();
var config = require('../../configuration/instagram-configuration');

ig.use({
    client_id: config.CLIENT_ID, 
    client_secret: config.CLIENT_SECRET
});

function authorizeUser(req, res) {
    res.json(ig.get_authorization_url(config.REDIRECT_URL, { scope: ['relationships']}));
}

function handleAuthorization(req, res) {
    console.log(req.body);
    ig.authorize_user(req.body.code, config.REDIRECT_URL, function(err, result) {
        if (err) {
            console.log(err);
            res.code = 400;
        } else {
            console.log(result);
            console.log('Access Token: ' + result.access_token);
            res.code = 200;
            //will replace with some more complex logic here to encrypt result id and pass the hashed id back to user in jwt
            res.json(result.access_token);
        }
    })
}

exports.authorizeUser = authorizeUser;
exports.handleAuthorization = handleAuthorization;