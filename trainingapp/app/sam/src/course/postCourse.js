const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;
  //courseid(S),  categoryid(S), coursename(S),  currency(S),  price(S),  expiryduration(S),  coursephoto(S),  highlights(S),  createdby(S), createdtime(S),  updatedby(S),  updatedtime(S) , deletedby(S),deletedtime(S)
  try {
  	const { courseid, categoryid, coursename, currency, price, expiryduration, coursephoto, highlights, createdby, createdtime, updatedby, updatedtime } = JSON.parse(body);
	  var highlightsStr = "null";
	
  	if(courseid) {
  		console.info('Updating course...');  		
  		if (!categoryid || !coursename || !currency || !price || !expiryduration || !coursephoto || !highlights || !updatedby || !updatedtime ) {
	      return {
	        statusCode: 403,
	        body: 'Mandatory fields Missing!'
	      }
	    }
	    highlightsStr = JSON.stringify(highlights);
	    console.info('Updating Course ==> ID:' + courseid + ', categoryid:' + categoryid + ', coursename:' + coursename + ', currency:' + currency + ', price:' + price + ', expiryduration:' + expiryduration + ', coursephoto:' + coursephoto +', highlights:' + highlightsStr + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
	    await dynamodb.updateItem({
	      TableName: 'Courses',
	      Key: { 'courseid': { 'S': courseid } },
	      UpdateExpression: 'SET categoryid = :categoryid,coursename = :coursename,currency = :currency,price = :price,expiryduration = :expiryduration,coursephoto = :coursephoto,highlights = :highlights, updatedby = :updatedby, updatedtime = :updatedtime',
	      ExpressionAttributeValues: { ":categoryid": {"S": categoryid},":coursename": {"S": coursename},":currency": {"S": currency},":price": {"S": price},":expiryduration": {"S": expiryduration},":coursephoto": {"S": coursephoto},":highlights": {"S": highlightsStr},":updatedby": {"S": updatedby}, ":updatedtime": {"S": updatedtime} },
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
        body: 'Course Updated Successfully!',
      }
  	}
  	console.info('Creating course...');
    if (!categoryid || !coursename || !currency || !price || !expiryduration || !coursephoto || !highlights || !createdby || !createdtime ) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Getting courseid...');
    var courseid_new = uuidv4();
    
  	highlightsStr = JSON.stringify(highlights);  	
    console.info('Saving Course ==> ID:' + courseid_new + ', categoryid:' + categoryid + ', coursename:' + coursename + ', currency:' + currency + ', price:' + price + ', expiryduration:' + expiryduration + ', coursephoto:' + coursephoto +', highlights:' + highlightsStr + ', createdby:' + createdby + ', createdtime:' + createdtime);
    await dynamodb.putItem({
      TableName: 'Courses',
      Item: {
        courseid: { S: courseid_new },
        categoryid: { S: categoryid },
        coursename: { S: coursename },
        currency: { S: currency },
        price: { S: price },
        expiryduration: { S: expiryduration },
        coursephoto: { S: coursephoto },
        highlights: { S: highlightsStr },
        createdby: { S: createdby },
        createdtime: { S: createdtime },
        updatedby: { S: "null" },
        updatedtime: { S: "null"},
        deletedby: { S: "null" },
        deletedtime: { S: "null" }
      }
    }).promise();
    
    //highlightid(S),  courseid(S), name(S), value(S),  updatedby(S),  updatedtime(S)
    /*
    var i;
	for (i = 0; i < highlights.length; i++) { 
		var highlightid = uuidv4();
		console.info('Highlights ==> ID:' + highlightid + ', name:' + highlights[i].name + ', value:' + highlights[i].value;
	    await dynamodb.putItem({
	      TableName: 'Coursehighlights',
	      Item: {
	        highlightid: { S: highlightid },
	        courseid: { S: courseid },
	        name: { S: highlights[i].name },
	        value: { S: highlights[i].value },
	        updatedby: { S: updatedby },
	        updatedtime: { S: updatedtime }
	      }
	    }).promise();
    }
    */
    return {
       statusCode: 200,
       body: 'Course Saved Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
