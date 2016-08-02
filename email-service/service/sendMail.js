var config = require('../config');
var mandrill = require('mandrill-api/mandrill');
var logger = require("../util/logger");

var Promise = require("es6-promise").Promise;

function sendMail(email){

  var mandrill_client = new mandrill.Mandrill(config.ApiKey);

  logger.info("preparing to process", {raw: email});

  var async = true;
  var mail_msg = {
    "html": email.message,
    "text": email.message,
    "subject": email.subject,
    "from_email": email.from.email,
    "from_name": email.from.name,
    "to": email.to.map(function(e){
      return {email: e.email, name: e.name}
    }),
    "headers": {
      "Reply-To": email.from.email
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    //"merge": true,
    //"merge_language": "mailchimp"
  };

  logger.info("preparing to send", {raw: email, processed: mail_msg});

  return new Promise(function(resolve, reject){

    mandrill_client.messages.send({"message": mail_msg, "async": async}, function(result) {
      logger.info('send success', {raw: email, processed: mail_msg, result: result});
      resolve(result);
    }, function(e) {
      logger.error('send failed',{message: email, error: e});
      reject(e);
    });
  });
}

module.exports = sendMail;