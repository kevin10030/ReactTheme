const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  try {
    const { courseid, deletedby, deletedtime } = JSON.parse(body);
    if (!courseid || !deletedby || !deletedtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Deleting Course...');
    
    await dynamodb.updateItem({
      TableName: 'Courses',
      Key: { 'courseid': { 'S': courseid } },
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
      TableName: 'Courses',
      Key: { "courseid": courseid }
    }).promise();
    */
    return {
       statusCode: 200,
       body: 'Course Deleted Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
