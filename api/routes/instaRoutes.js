module.exports = function(app) {
    var controller = require('../controllers/instaController');

    //routes
    app.route('/api/instagram/authenticate')
        .get(controller.authorizeUser);

    app.route('/api/instagram/authenticated')
        .post(controller.handleAuthorization);
}