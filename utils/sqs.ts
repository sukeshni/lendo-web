// Load the AWS SDK for Node.js
import AWS, { AWSError } from "aws-sdk";
import { ReceiveMessageResult } from "aws-sdk/clients/sqs";
import "dotenv/config";

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_SECRET as string,
};

// Set the region
AWS.config.update({ region: "eu-west-1" });

// Create an SQS service object
const sqs = new AWS.SQS({ credentials, apiVersion: "2012-11-05" });
const SQS_QUEUE_URL = "http://localhost:4566/000000000000/sample-queue";

// client calls get api again after 30 seconds after submitting application, so need for it to be FIFO queue
export const sendToSQS = (message: any) => {
  console.log("----sendMessage");

  const params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageBody: JSON.stringify(message),
    QueueUrl: SQS_QUEUE_URL,
  };
  sqs.sendMessage(params, function (err: any, data: { MessageId?: any }) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#receiveMessage-property
export const readFromSqs = () => {
  console.log("----readSqsmessage");

  var params = {
    QueueUrl: SQS_QUEUE_URL,
    MaxNumberOfMessages: 1,
  };

  sqs.receiveMessage(
    params,
    function (err: AWSError, data: ReceiveMessageResult) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    }
  );
};
