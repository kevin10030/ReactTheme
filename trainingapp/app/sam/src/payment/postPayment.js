const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const stripe = require('stripe')('sk_test_51HoJ7lEW8ELLg74EtYSjzjvLfCf1FMaHYA4uWmIrXknf7Z9zGz6ntGuogHcvZBfUQy2JJCRcd1MfipHccxhNfjzf00fdPvmEz8');

exports.handler = async (event) => {
  const { body } = event;
  //paymentid(S),  orderitemid(S), useremail, courseid(S),   chargeid(S),  is_refunded(N),  updatedby(S), updatedtime(S)
  try {
    const { stripeToken, currency, useremail,courseid, coursename, amount, updatedby, updatedtime} = JSON.parse(body);
    if (!stripeToken || !currency  || !useremail || !courseid || !coursename || !amount || !updatedby || !updatedtime)
	  {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    var chargeid = 'ch_';
    try{
      // Token is created using Stripe Checkout or Elements!
      const charge = await stripe.charges.create({
        amount: parseInt(amount) * 100,
        currency: currency,
        description: coursename,
        source: stripeToken,
      });
      chargeid = charge.id;
    }catch (err) {
       return {
         statusCode: 500,
         body: 'Charge ' + err,
       }
    }
    
    console.info('Getting order id...');
  	var orderid = uuidv4();
  //userid
    // console.info('Saving Order ==> ID:' + orderid + ', userid:' + userid + ', status:' + status + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);    
    await dynamodb.putItem({
      TableName: 'Orders',
      Item: {
        orderid: {S: orderid },
        userid: {S: updatedby },
        status: { S: 'Purchased' },      
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();
    
    console.info('Getting orderitem id...');
    var orderitemid = uuidv4();
    //orderitemid(S), orderid(S),  ordertype(S),  productid(S),  currency(S),  price(S), updatedby(S), updatedtime(S)
    // console.info('Saving OrderItem ==> ID:' + orderitemid + ', ordertype:' + ordertype + ', productid:' + productid + ', currency:' + currency + ', price:' + price + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
     await dynamodb.putItem({
      TableName: 'OrderItems',
      Item: {
        orderitemid: {S: orderitemid },
        orderid: {S: orderid },
        ordertype: { S: 'Course' },
        productid: { S: courseid },
        currency: { S: currency },
		    price: { S: amount },
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();

    console.info('Getting paymentId...');
    var paymentId = uuidv4();
    //paymentid(S),  orderitemid(S),   courseid(S),   chargeid(S),  is_refunded(N),  updatedby(S), updatedtime(S)
    console.info('Saving Payment ==> ID:' +paymentId + ', Orderitemid:' + orderitemid + ', CourseId:' + courseid + ', Amount:' + amount + ', Currency:' + currency + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
    await dynamodb.putItem({
      TableName: 'Payments',
      Item: {
      	paymentid: { S: paymentId },
        orderitemid: { S: orderitemid },
        useremail: { S: useremail },
        courseid: { S: courseid },
        chargeid: { S: chargeid },
        is_refunded: {N: '0'},
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();

    return {
       statusCode: 200,
       body: 'Payment is done successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
