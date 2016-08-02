var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    'status': "running",
    'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
    'AWS_SECRET_KEY': process.env.AWS_SECRET_KEY,
    'AWS_REGION': process.env.AWS_REGION
  });
});

module.exports = router;
