var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');

var appRoutes = require('./api/routes/routes');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

router.get('/what', function(req, res) {
    res.send('what?');
});

appRoutes(router, app);

//Angular Build Directory
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// angular 2 spa routing catch-all
// angular 2 will handle 404 errors
app.get('*', function(req, res) {
    res.sendFile(distDir + 'index.html');
});

var mongoConfig = require('./configuration/mongo-configuration');
var mongoUri = process.env.MONGODB_URI || mongoConfig.DB_URI;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', function() {
    console.log('Mongoose Connection Established');
});

server.listen(port, function() {
   console.log("App now running on port", port); 
});