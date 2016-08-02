
var queue = require("./queue"),
    sendMail = require("./sendMail");

var logger = require("../util/logger");

var done = true;

function execute(){
  queue.receive()
    .then(function(message){

      if (message.length > 0){

        //HACK because we've set the receive count to 0 in config.js
        var message = message[0];

        // message is full sqs message.
        return sendMail(message.body)
          .then(function(){
            // we only want to pass the email part of it to sendMail but the
            // whole thing should proceed down the promise chain
            return message;
          })
          .then(queue.delete);

      } else {
        return message;
      }
    })
    .catch(function(e){
      //functions report their own errors so this is only here
      //so that the next "then" always executes
    })
    .then(function(){
      done = true;
    });
}

function poll(){
  if (done){
    done = false;
    execute();
  }
}

function startPolling(){
  setInterval(poll, 100);
}

module.exports = {
  start: startPolling
};