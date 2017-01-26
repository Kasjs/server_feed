var mongoose = require('mongoose'),
	express = require('express'),
	router = express.Router(),
	feedCtrl = require('../controllers/feeds');

router.post('/getParsedFeed', feedCtrl.getParsedFeed);

module.exports = router;
