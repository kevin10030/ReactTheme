const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const stripe = require('stripe')('sk_test_51HoJ7lEW8ELLg74EtYSjzjvLfCf1FMaHYA4uWmIrXknf7Z9zGz6ntGuogHcvZBfUQy2JJCRcd1MfipHccxhNfjzf00fdPvmEz8');

exports.handler = async (event) => {
  const { body } = event;
  //refundid(S), paymentid(S), amount(S), adminemail(S), updatedby(S),  updatedtime(S)
  try {
    const {chargeid, paymentid, amount, adminemail, updatedby, updatedtime} = JSON.parse(body);
    if (!chargeid || !paymentid || !amount || !adminemail || !updatedby || !updatedtime)
  	{
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    
	try{
		const refund = await stripe.refunds.create({
	  		charge: chargeid,
		});
	}catch (err) {
    return {
      statusCode: 500,
      body: 'Refund ' + err,
    }
  }  
  
  	console.info('Getting refundId...');
    var refundId = uuidv4();
  	//refundid(S), paymentid(S), amount(S), adminemail(S), updatedby(S),  updatedtime(S)
    console.info('Saving refund ==> ID:' +refundId + ',PaymentId:' + paymentid + ', Amount:' + amount + ', AdminEmail:' + adminemail + ', UpdatedBy:' + updatedby + ', updatedtime:' + updatedtime);
    await dynamodb.putItem({
      TableName: 'Refunds',
      Item: {
      	refundid: {S: refundId},
      	paymentid: { S: paymentid},
        amount: { S: amount },
        adminemail: { S: adminemail },
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();

    await dynamodb.updateItem({
      TableName: 'Payments',
      Key: { 'paymentid': { 'S': paymentid } },
      UpdateExpression: 'SET is_refunded = :value',
      ExpressionAttributeValues: { ":value": {'N': '1'} },
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
       body: ' Refund has been processed successfully.',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
