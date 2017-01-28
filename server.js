'use strict';
var express    = require('express'),
	fs         = require("fs"),
	mongoose   = require('mongoose'),
	app        = express(),
	session    = require('express-session'),
    cors       = require('cors'),
	bodyParser = require('body-parser'),
	path       = require('path'),
	flash      = require('express-flash');
    require('./server/models/Feed');
	var routes = require('./server/routes/index');

mongoose.connect(process.env.DB_URL || 'mongodb://Kasjs:Mantrudevelop1985@ds027338.mlab.com:27338/learn_phrase_app');
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB');
});

app.set('port', process.env.PORT || 3000);
app.set('base url', process.env.URL || 'http://localhost');
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', process.env.allowOrigin || 'http://localhost');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/server'));
app.use('/', routes);

app.listen(app.get('port'));

module.exports = app;
