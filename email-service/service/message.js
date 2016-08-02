var config = require('../config');
var AWS = require('aws-sdk');
var sqs;

AWS.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_KEY,
  "region": process.env.AWS_REGION
});

// Instantiating SQS
sqs = new AWS.SQS({apiVersion: config.apiVersion});

/* Delivers a message to the specified queue */
exports.sendMessage = function(req, res) {
  // message for test
  var message = {
    to: [{
      email: 'danieloskin1984@gmail.com'
    },{
      email: 'victorwall342@gmail.com', name: 'Victor Wall'
    }],
    from: {
      email: 'scottoskin1988@gmail.com', name: 'Scott Oskin'
    },
    subject: 'The test for sending message',
    body: 'This is the test for sending message'
  };

  // params
  var params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.EMAIL_QUEUE
  };

  // sending message
  sqs.sendMessage(params, function(err, data) {
    if (err) res.send(err);       // an error occurred
    else {
      console.log('Successfully sent the message to the queue');
      console.log(data);          // successful response
      res.send(data);
    }
  });

};

/* Deletes the specified message from the specified queue */
exports.deleteMessage = function(req, res) {
  // params
  var params = {
    QueueUrl: process.env.EMAIL_QUEUE,
    ReceiptHandle: req.body.message.ReceiptHandle
  };

  // deleting message
  sqs.deleteMessage(params, function(err, data) {
    if (err) res.send(err);       // an error occurred
    else {
      console.log('Successfully deleted the message from the queue');
      console.log(data);          // successful response
      res.send(data);
    }
  });
}