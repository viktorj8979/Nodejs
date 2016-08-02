var express = require('express');
var service = require("./service");

var status = require('./routes/status');
var app = express();

app.use('/status', status);


//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

service.start();

module.exports = app;
