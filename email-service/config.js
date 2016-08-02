var config = {
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_KEY,
  "region": process.env.AWS_REGION,
  "QueueUrl": process.env.EMAIL_QUEUE,
  "ApiKey": process.env.MANDRILL_API_KEY
};

config.apiVersion = '2012-11-05';
config.MaxNumberOfMessages = 1;
config.VisiblilityTimeout = 60;
config.WaitTimeSeconds = 0;

module.exports = config;
