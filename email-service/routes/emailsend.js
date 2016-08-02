var express = require('express');
var router = express.Router();
var mail = require('../service/mail');

router.get('/', function(req, res, next) {
  mail.sendMail(req, res);
});

module.exports = router;
