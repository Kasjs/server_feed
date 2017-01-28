var mongoose = require('mongoose');

var feedSchema = new mongoose.Schema({
 title: { type: String, unique: true },
 entries: { type: Array }
});

module.exports = mongoose.model('Feed', feedSchema);
