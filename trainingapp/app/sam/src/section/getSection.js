const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { sectionid } = event.pathParameters;
  try {
    if (!sectionid) {
      return {
        statusCode: 403,
        body: 'Section id is Required!'
      }
    }
    console.info('Fetching Sections...');
    const result = await docClient.get({
      TableName: 'Sections',
      Key: { 'sectionid': sectionid }
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
