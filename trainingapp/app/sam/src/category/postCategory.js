const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  //categoryid(S), categoryname(S),  createdby(S), createdtime(S), updatedby(S), updatedtime(S), deletedby(S),deletedtime(S)
  try {
    const { categoryid, categoryname, createdby, createdtime, updatedby,updatedtime } = JSON.parse(body);
    if(categoryid) {		// update category
    	console.info('Updating category...');
    	if (!categoryname || !updatedby || !updatedtime) {
    		 return {
        		statusCode: 403,
        		body: 'Mandatory fields Missing!'
      		}
    	}
    	console.info('Updating Category ==> ID:' + categoryid + ', categoryname:' + categoryname);
    	
    	await dynamodb.updateItem({
	      TableName: 'Categories',
	      Key: { 'categoryid': { 'S': categoryid } },
	      UpdateExpression: 'SET categoryname = :categoryname,  updatedby = :updatedby, updatedtime = :updatedtime',
	      ExpressionAttributeValues: { ":categoryname": {"S": categoryname}, ":updatedby": {"S": updatedby}, ":updatedtime": {"S": updatedtime} },
	      ReturnValues: "UPDATED_NEW"
	    }).promise().then(
	      function(data) {       
	      },
	      function(error) {
	        console.info('Update Error ==> ' + error);
	        return {
	           statusCode: 500,
	           body: 'Update ' + error,
	        }
	      }
	    );
    	return {
       		statusCode: 200,
       		body: 'Category Updated Successfully!',
    	}
    }
    console.info('Creating category...');
    if (!categoryname || !createdby || !createdtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Getting categoryid...');
  	var categoryid_new = uuidv4();
  
    console.info('Saving Category ==> ID:' + categoryid_new + ', categoryname:' + categoryname);
    
    await dynamodb.putItem({
      TableName: 'Categories',
      Item: {
        categoryid: {S: categoryid_new },
        categoryname: { S: categoryname },
        createdby: { S: createdby },
        createdtime: { S: createdtime },
        updatedby: { S: "null" },
        updatedtime: { S: "null" },
        deletedby: { S: "null" },
        deletedtime: { S: "null" }
      }
    }).promise();
    
    return {
       statusCode: 200,
       body: 'Category Saved Successfully!',
    }
  } catch (err) {
    console.info('Put Error ==> ' + err);
    return {
       statusCode: 500,
       body: err,
    }
  }
};
