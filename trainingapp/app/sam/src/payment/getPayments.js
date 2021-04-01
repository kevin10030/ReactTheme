const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    console.info('Fetching Payment List...');
    const result = await docClient.scan({
      TableName: 'Payments',
      FilterExpression: "is_refunded = :is_refunded_val",
      ExpressionAttributeValues: { ":is_refunded_val": 0 }
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
      body: 'Error: ' + err,
    }
  }
};
