const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { orderid } = event.pathParameters;
  try {
    if (!orderid) {
      return {
        statusCode: 403,
        body: 'Orderid is Required!'
      }
    }
    console.info('Fetching Order...');
    const result = await docClient.get({
      TableName: 'Orders',
      Key: { 'orderid': orderid }
    }).promise();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.Item),
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    }
  }
};
