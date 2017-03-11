var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);

var instaRoutes = require('./api/routes/instaRoutes');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

instaRoutes(app);

//Angular Build Directory
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// angular 2 spa routing catch-all
// angular 2 will handle 404 errors
app.get('*', function(req, res) {
    res.sendFile(distDir + 'index.html');
});

server.listen(port, function() {
   console.log("App now running on port", port); 
});