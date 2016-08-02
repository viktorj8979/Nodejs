
var Promise = require("es6-promise").Promise;
var config = require('../config');
var AWS = require('aws-sdk');
var logger = require('../util/logger');
var uid = require('uid');

AWS.config.update({
  "accessKeyId": config.accessKeyId,
  "secretAccessKey": config.secretAccessKey,
  "region": config.region
});

var sqs = new AWS.SQS({apiVersion: config.apiVersion});

var params = {
  QueueUrl: config.QueueUrl,
  MaxNumberOfMessages: config.MaxNumberOfMessages,
  VisibilityTimeout: config.VisiblilityTimeout,
  WaitTimeSeconds: config.WaitTimeSeconds
};

function receiveMessage(){
  return new Promise(function(resolve, reject){
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        logger.error("queue receive error", {error: err});
        reject(error);
        return
      }

      var ret = [];

      if (data.Messages){
        logger.info("loaded listings", {count: data.Messages.length, requested: data});
        ret = data.Messages.map(function(message) {
          message.body = JSON.parse(message.Body);
          logger.info("message", {requestId: uid(10), requested: message});
          return message;
        });
      } else {
        logger.info("no messages");
      }
      resolve(ret);
    });
  });
}

module.exports = {
  receive: receiveMessage,
  delete: removeFromQueue
};

function removeFromQueue(message) {
  return new Promise(function(resolve, reject){
    sqs.deleteMessage({
      QueueUrl: config.QueueUrl,
      ReceiptHandle: message.ReceiptHandle
    }, function(err, data) {
      // If we errored, tell us that we did
      if(err) {
        logger.error("queue delete error", {error: err});
        reject(error);
      } else {
        logger.debug("queue message deleted");
        resolve(data);
      }
    });
  });

};
