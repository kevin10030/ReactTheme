const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  try {
    const { categoryid, deletedby, deletedtime  } = JSON.parse(body);
    if (!categoryid || !deletedby || !deletedtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Deleting Category...');
    await dynamodb.updateItem({
      TableName: 'Categories',
      Key: { 'categoryid': { 'S': categoryid } },
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
    
    /*
    await dynamodb.deleteItem({
      TableName: 'Categories',
      Key: { "categoryid": categoryid }
    }).promise();
    */
    return {
       statusCode: 200,
       body: 'Category Deleted Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
