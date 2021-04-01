const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  try {
    const { sectionid, deletedby, deletedtime  } = JSON.parse(body);
    if (!sectionid || !deletedby || !deletedtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Deleting Section...');
    await dynamodb.updateItem({
      TableName: 'Sections',
      Key: { 'sectionid': { 'S': sectionid } },
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
       body: 'Section Deleted Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
