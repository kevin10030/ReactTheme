const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;  
  //topicid(S),  sectionid(S),  topicname(S),  videofile(S),  content(S),  uploadedfile(S), createdby(S), createdtime(S),  updatedby(S),  updatedtime(S) ,  deletedby(S),deletedtime(S)
  try {
    const { topicid, sectionid, topicname, videofile, content, uploadedfile, createdby, createdtime, updatedby,updatedtime } = JSON.parse(body);
    var videofile_new = "null";
    var content_new = "null"
    var uploadedfile_new = "null"
    if(videofile && videofile!='') videofile_new = videofile;
    if(content && content!='') content_new = content;
    if(uploadedfile && uploadedfile!='') uploadedfile_new = uploadedfile;

    if(topicid) {		// update section
    	console.info('Updating topic...');
    	// if (!sectionid || !topicname || !videofile || !content || !uploadedfile || !updatedby || !updatedtime) {
      if (!sectionid || !topicname || !updatedby || !updatedtime) {
          return {
        		statusCode: 403,
        		body: 'Mandatory fields Missing!'
      		}
      }
      
    	console.info('Updating Topic ==> ID:' + topicid + ', sectionid:' + sectionid + ', topicname:' + topicname + ', videofile:' + videofile + ', content:' + content + ', uploadedfile:' + uploadedfile + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
    	
    	await dynamodb.updateItem({
	      TableName: 'Topics',
	      Key: { 'topicid': { 'S': topicid } },
	      UpdateExpression: 'SET sectionid = :sectionid, topicname = :topicname, videofile = :videofile, content = :content, uploadedfile = :uploadedfile, updatedby = :updatedby, updatedtime = :updatedtime',
	      ExpressionAttributeValues: { ":sectionid": {"S": sectionid}, ":topicname": {"S": topicname}, ":videofile": {"S": videofile_new}, ":content": {"S": content_new}, ":uploadedfile": {"S": uploadedfile_new}, ":updatedby": {"S": updatedby}, ":updatedtime": {"S": updatedtime} },
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
       		body: 'Topic Updated Successfully!',
    	}
    }
    console.info('Creating topic...');
    // if (!sectionid || !topicname || !videofile || !content || !uploadedfile || !createdby || !createdtime) {
    if (!sectionid || !topicname || !createdby || !createdtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Getting sectionid...');
  	var topicid_new = uuidv4();
  
    console.info('Saving Topic ==> ID:' + topicid_new + ', sectionid:' + sectionid + ', topicname:' + topicname + ', videofile:' + videofile + ', content:' + content + ', uploadedfile:' + uploadedfile + ', createdby:' + createdby + ', createdtime:' + createdtime);
    
    await dynamodb.putItem({
      TableName: 'Topics',
      Item: {
        topicid: {S: topicid_new },
        sectionid: {S: sectionid },
        topicname: { S: topicname },
        videofile: { S: videofile_new },
        content: { S: content_new },
        uploadedfile: { S: uploadedfile_new },
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
       body: 'Topic Saved Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
