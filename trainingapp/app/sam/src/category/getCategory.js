const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { categoryid } = event.pathParameters;
  try {
    if (!categoryid) {
      return {
        statusCode: 403,
        body: 'Category id is Required!'
      }
    }
    console.info('Fetching Categories...');
    const result = await docClient.get({
      TableName: 'Categories',
      Key: { 'categoryid': categoryid }
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
