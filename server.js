'use strict';
// ' mongodb://Lavios:PassData1707@ds039484.mongolab.com:39484/urls'
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://Lavios:PassData1707@ds039484.mongolab.com:39484/urls');

//Using middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/.tmp/styles')));
app.use(express.static('E:/Work Type Things/Code/Projects/Back End/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//configuration of app

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

//Routes

app.use(require('./routes/dynamic.js'));

//Listen on this port, Starting the server
app.listen(3000, function() {
	console.log('Server is running on port 3000');
});

