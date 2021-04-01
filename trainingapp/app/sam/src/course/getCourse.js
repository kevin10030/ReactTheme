const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { courseid } = event.pathParameters;
  try {
    if (!courseid) {
      return {
        statusCode: 403,
        body: 'Course id is Required!'
      }
    }
    console.info('Fetching Course Details...');
    const result = await docClient.get({
      TableName: 'Courses',
      Key: { 'courseid': courseid }
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
