const {v4 : uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { body } = event;  
  //orderid(S),  userid(S),  status(S),   updatedby(S), updatedtime(S)
  //orderitemid(S), orderid(S),  ordertype(S),  productid(S),  currency(S),  price(S), updatedby(S), updatedtime(S)
  try {
    const { userid, status, ordertype, productid, currency, price, updatedby,updatedtime } = JSON.parse(body);
   
    console.info('Creating order...');
    if (!userid || !status || !ordertype || !productid || !currency || !price || !updatedby || !updatedtime) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    console.info('Getting order id...');
  	var orderid = uuidv4();
  
    console.info('Saving Order ==> ID:' + orderid + ', userid:' + userid + ', status:' + status + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);    
    await dynamodb.putItem({
      TableName: 'Orders',
      Item: {
        orderid: {S: orderid },
        userid: {S: userid },
        status: { S: status },      
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();
    
    console.info('Getting orderitem id...');
    var orderitemid = uuidv4();
    //orderitemid(S), orderid(S),  ordertype(S),  productid(S),  currency(S),  price(S), updatedby(S), updatedtime(S)
    console.info('Saving OrderItem ==> ID:' + orderitemid + ', ordertype:' + ordertype + ', productid:' + productid + ', currency:' + currency + ', price:' + price + ', updatedby:' + updatedby + ', updatedtime:' + updatedtime);
     await dynamodb.putItem({
      TableName: 'OrderItems',
      Item: {
        orderitemid: {S: orderitemid },
        orderid: {S: orderid },
        ordertype: { S: ordertype },
        productid: { S: productid },
        currency: { S: currency },
		    price: { S: price },
        updatedby: { S: updatedby },
        updatedtime: { S: updatedtime }
      }
    }).promise();
    
    return {
       statusCode: 200,
       body: 'Order Saved Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: err,
    }
  }
};
