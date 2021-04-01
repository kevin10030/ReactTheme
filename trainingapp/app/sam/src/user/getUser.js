const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.info('Running getUser handler function...');
  try {
    const email = event.headers['user-email'];
    if (!email) {
      return {
        statusCode: 403,
        body: 'User Email is Required!'
      }
    }
    console.info('Finding User with Email: ' + email);
    const result = await docClient.scan({
      TableName: 'Users',
      FilterExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email }
    }).promise();
    console.info('GetUser Query Result: ' + result);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.Items),
    }
  } catch (err) {
    console.log('Error in getUser handler function: ' + err);
    return {
      statusCode: 500,
      body: err,
    }
  }
};
