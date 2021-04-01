const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  //sectionid(S),  courseid(S),  sectionname(S),  createdby(S), createdtime(S),   updatedby(S),  updatedtime(S) , deletedby(S), deletedtime(S)
  try {
    const { sectionid, courseid, sectionname, createdby, createdtime, updatedby,updatedtime } = JSON.parse(body);
    if(sectionid) {		// update section
    	console.info('Updating section...');
    	if (!courseid || !sectionname || !updatedby || !updatedtime) {
    		 return {
        		statusCode: 403,
        		body: 'Mandatory fields Missing!'
      		}
    	}
    	console.info('Updating Section ==> ID:' + sectionid + ', courseid:' + courseid + ', sectionname:' + sectionname + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
    	
    	await dynamodb.updateItem({
	      TableName: 'Sections',
	      Key: { 'sectionid': { 'S': sectionid } },
	      UpdateExpression: 'SET courseid = :courseid, sectionname = :sectionname,  updatedby = :updatedby, updatedtime = :updatedtime',
	      ExpressionAttributeValues: { ":courseid": {"S": courseid}, ":sectionname": {"S": sectionname}, ":updatedby": {"S": updatedby}, ":updatedtime": {"S": updatedtime} },
	      ReturnValues: "UPDATED_NEW"
	    }).promise().then(
	      function(data) {       
	      },
	      function(error) {
	        console.info('Error ==> ' + error);
	        return {
	           statusCode: 500,
	           body: 'Update ' + error,
	        }
	      }
	    );
    	return {
       		statusCode: 200,
       		body: 'Section Updated Successfully!',
    	}
    }
    console.info('Creating section...');
    if (!courseid || !sectionname || !createdby || !createdtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Getting sectionid...');
  	var sectionid_new = uuidv4();
  
    console.info('Saving Section ==> ID:' + sectionid_new + ', courseid:' + courseid + ', sectionname:' + sectionname + ', createdby:' + createdby + ', createdtime:' + createdtime);
    
    await dynamodb.putItem({
      TableName: 'Sections',
      Item: {
        sectionid: {S: sectionid_new },
        courseid: {S: courseid },
        sectionname: { S: sectionname },
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
       body: 'Section Saved Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
