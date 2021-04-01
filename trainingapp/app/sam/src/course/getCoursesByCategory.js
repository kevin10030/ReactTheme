const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { categoryid } = event;
  try {
    if (!categoryid) {
      return {
        statusCode: 403,
        body: 'Category id is Required!'
      }
    }
    console.info('Fetching Course By Category ==> ' + category);
    const result = await docClient.query({
      TableName: 'Courses',
      KeyConditionExpression: 'categoryid = :categoryid',
      ExpressionAttributeValues: {
        ':categoryid': categoryid
      }
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
