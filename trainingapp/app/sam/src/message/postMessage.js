const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const ses = new AWS.SES({apiVersion: '2010-12-01'});
const {v4 : uuidv4} = require('uuid');

exports.handler = async (event) => {
  console.info('Running postMessage handler function...');
  const { body } = event;
  try {
    const { name, email, mobilenumber, subject, message, type } = JSON.parse(body);
    if (!name || !email || !subject || !message || !type) {
      return {
        statusCode: 403,
        body: 'Mandatory fields Missing!'
      }
    }
    var messageid = uuidv4();
    console.info('Saving Message ==> messageid:' + messageid + ', type:' + type);
    await dynamodb.putItem({
      TableName: 'Messages',
      Item: {
        messageid: { S: messageid },
        name: { S: name },
        email: { S: email },
        mobilenumber: { S: mobilenumber },
        subject: { S: subject },
        message: { S: message },
        type: { S: type },
        createdtime: { S: Date.now().toString() },
        deletedby: { S: "null" },
        deletedtime: { S: "null" }
      }
    }).promise();

    var messageBodyHtml = "<html><head></head><body>";
    messageBodyHtml += "<strong>----- " + type + " message -----</strong><br>";
    messageBodyHtml += "<strong>Name: </strong>" + name + "<br>";
    messageBodyHtml += "<strong>Email: </strong>" + email + "<br>";
    messageBodyHtml += "<strong>Mobile: </strong>" + mobilenumber + "<br>";
    messageBodyHtml += "<strong>Subject: </strong>" + subject + "<br>";
    messageBodyHtml += "<strong>Message: </strong>" + message + "<br>";
    messageBodyHtml += "<strong>--------------------</strong>";
    messageBodyHtml += "</body></html>";

    var messageParams = {
      Source: 'arun2808@gmail.com',
      Destination: {
        ToAddresses: ['arun2808@gmail.com'],
        CcAddresses: ['prasanna.sherekar@gmail.com']
      },
      //ReplyToAddresses: [email],
      Message: {
        Subject: { Charset: 'UTF-8', Data: subject },
        Body: {
          /*Text: {
            Charset: "UTF-8",
            Data: message
          },*/
          Html: {
            Charset: "UTF-8",
            Data: messageBodyHtml
          }
        }
      }
    };

    await ses.sendEmail(messageParams).promise();

    /*var sendPromise = ses.sendEmail(messageParams).promise();
    sendPromise.then(
      function(data) {
        console.log('Message with MessageId: ' + data.MessageId + 'sent Successfully');
      }).catch(
        function(err) {
          console.log('Error sending mail...');
          console.error(err, err.stack);
          throw err;
      });*/

    return {
       statusCode: 200,
       body: 'Message Sent Successfully!',
    }
  } catch (err) {
    return {
       statusCode: 500,
       body: 'Error: ' + err,
    }
  }
};
