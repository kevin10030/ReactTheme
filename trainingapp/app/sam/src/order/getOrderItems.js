const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    console.info('Fetching OrderItems List...');
    const result = await docClient.scan({
      TableName: 'OrderItems'
    }).promise();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.Items),
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    }
  }
};
