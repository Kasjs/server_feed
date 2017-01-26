var mongoose = require('mongoose');

var feedSchema = new mongoose.Schema({
	title: String,
	description: String,
	link: String,
	rsslink: String
});

module.exports = mongoose.model('Feed', feedSchema);
