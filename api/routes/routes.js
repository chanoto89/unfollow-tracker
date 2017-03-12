var jwt = require('jsonwebtoken');
var jwtConfig = require('../../configuration/jwt-configuration');

module.exports = function(router, app) {
    var controller = require('../controllers/insta-auth-controller');

    //auth routes - no token required
    router.get('/instagram/authenticate', controller.authorizeUser);
    router.post('/instagram/authenticated', controller.handleAuthorization);

    //jwt middleware
    router.use(function(res, req, next) {
        //check for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decode token
        if (token) {
            jwt.verify(token, jwtConfig.CLIENT_SECRET, function(err, decoded) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false, 
                        message: 'Token not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(401).send({
                success: false, 
                message: 'No token provided'
            });
        }
    });


    app.use('/api', router);
}