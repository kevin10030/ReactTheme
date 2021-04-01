const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  try {
    const { messageid, deletedby, deletedtime } = JSON.parse(body);
    if (!messageid || !deletedby || !deletedtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Deleting Message...');

    await dynamodb.updateItem({
      TableName: 'Messages',
      Key: { 'messageid': { 'S': messageid } },
      UpdateExpression: 'SET deletedby = :deletedby, deletedtime = :deletedtime',
      ExpressionAttributeValues: { ":deletedby": {"S": deletedby}, ":deletedtime": {"S": deletedtime} },
      ReturnValues: "UPDATED_NEW"
    }).promise().then(
      function(data) {
      },
      function(error) {
        console.info('Error ==> ' + error);
        return {
           statusCode: 500,
           body: 'Delete ' + error,
        }
      }
    );
    return {
       statusCode: 200,
       body: 'Message Deleted Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
