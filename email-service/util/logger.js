var winston = require('winston');
winston.add(winston.transports.DailyRotateFile, {filename: 'logs/service.log', json: true, logstash: true});
winston.remove(winston.transports.Console);

if (process.env.LOGSENE_TOKEN){
  var logsene = require('winston-logsene');
  winston.add(logsene, { token: process.env.LOGSENE_TOKEN });
}

module.exports = winston;