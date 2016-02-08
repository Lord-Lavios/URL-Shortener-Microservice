'use strict';

var express = require('express');
var userURL = require('.././models/first.js');
var router = express.Router();

function random() {
	var num = [];
	for(var i = 0; i<2; i++) {
		var turn = Math.random();
		if(turn < 0.49) {
			num.push(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
		} else {
			num.push(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
		}
	}
	num = num.map(function(k) {
		return String.fromCharCode(k);
	});
	return num.join('');
}


function ifExists(p, done) {
	userURL.find({orignalURL: p}, function (err, k) {
		if(k.length > 0) {
			done(null, k);
		} else {
			done(null, 'not found');
		}
	});
}

router.get('/:url', function(req, res) {
	var url = req.params.url;
	userURL.find({shortenedURL: url}, function(err, userURL) {
		if(userURL.length > 0) {
			res.redirect(userURL[0].orignalURL);
		} else {
			res.send('No URL Found');
		}
	});
});


router.get('/', function(req, res) {
	res.render('index');
	res.end();
});

router.post('/add', function(req, res) {
	var patt = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	var orignalURL = req.body.url;
	var split = orignalURL.split('');
		if(split[0] !== 'h') {
			orignalURL = 'http://' + orignalURL;
		}
	if(patt.test(orignalURL) === false) {
		res.jsonp({orignalURL: 'Invalid URL'});
	} else {
		ifExists(orignalURL, function (err, some) {
			if(some === 'not found') {
				var newUser = new userURL();
				newUser.orignalURL = orignalURL;
				newUser.shortenedURL = random();
				newUser.save(function() {
					if(err) {
						throw err;
					}
				});
				res.jsonp({url: 'minallurl.herokuapp.com/' + newUser.shortenedURL});	
			} else {
				res.jsonp({url: 'minallurl.herokuapp.com/' + some[0].shortenedURL});	
			}
		});
	}
});

module.exports = router;

//https://git.heroku.minallurl.git