const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { topicid } = event.pathParameters;
  try {
    if (!topicid) {
      return {
        statusCode: 403,
        body: 'Topic id is Required!'
      }
    }
    console.info('Fetching Topics...');
    const result = await docClient.get({
      TableName: 'Topics',
      Key: { 'topicid': topicid }
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
