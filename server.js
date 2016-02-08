'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://username:passwork@something.mongolab.com:number/something');
var port = process.env.PORT || 8080;

//Using middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/.tmp/styles')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//configuration of app

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

//Routes

app.use(require('./routes/dynamic.js'));

//Listen on this port, Starting the server
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

