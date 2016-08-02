var express = require('express');
var router = express.Router();
var message = require('../service/message');

/* GET send message. */
router.get('/send', function(req, res, next) {
  message.sendMessage(req, res);
});

/* GET delete message. */
router.get('/delete', function(req, res, next) {
  //message.deleteMessage(req, res);
});

module.exports = router;
