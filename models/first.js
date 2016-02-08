'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userUrlSchema = new Schema({
	shortenedURL: String,
	orignalURL: String
});

module.exports = mongoose.model('userURL', userUrlSchema);

