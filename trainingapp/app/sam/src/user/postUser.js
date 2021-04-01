const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const {v4 : uuidv4} = require('uuid');

exports.handler = async (event) => {
  console.info('Running postUser handler function...');
  const { body } = event;
  try {
    const { userId, email, firstname, lastname, company, country, state, city, address, pincode, mobilenumber, userrole } = JSON.parse(body);
    if (!email || !firstname) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    if(userId) {
      console.info('Updating User ==> userId:' + userId + ', email:' + email);
	    await dynamodb.updateItem({
	      TableName: 'Users',
	      Key: { 'userId': { 'S': userId } },
	      UpdateExpression: 'SET firstname = :firstname, lastname = :lastname, company = :company, country = :country, #state = :state, city = :city, address = :address, pincode = :pincode, mobilenumber = :mobilenumber, userrole = :userrole, updatedtime = :updatedtime',
        ExpressionAttributeNames: { "#state": "state" },
        ExpressionAttributeValues: {
          ":firstname": { "S": firstname },
          ":lastname": { "S": lastname },
          ":company": { "S": company },
          ":country": { "S": country },
          ":state": { "S": state },
          ":city": { "S": city },
          ":address": { "S": address },
          ":pincode": { "S": pincode },
          ":mobilenumber": { "S": mobilenumber },
          ":userrole": { "S": userrole },
          ":updatedtime": { "S": Date.now().toString() }
        },
	      ReturnValues: "UPDATED_NEW"
	    }).promise().then(
	      function(data) {
          console.info('data ==> ' + data);
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
        body: 'User Updated Successfully!',
      }
    } else {
      var uId = uuidv4();
      console.info('Saving User ==> userId:' + uId + ', Email:' + email);
      await dynamodb.putItem({
        TableName: 'Users',
        Item: {
          userId: { S: uId },
          email: { S: email },
          firstname: { S: firstname },
          lastname: { S: lastname },
          company: { S: company },
          country: { S: country },
          state: { S: state },
          city: { S: city },
          address: { S: address },
          pincode: { S: pincode },
          mobilenumber: { S: mobilenumber },
          userrole: { S: userrole },
          createdtime: { S: Date.now().toString() },
          updatedtime: { S: Date.now().toString() }
        }
      }).promise();
      return {
         statusCode: 200,
         body: 'User Saved Successfully!',
      }
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: 'Error: ' + err,
    }
  }
};
