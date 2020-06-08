const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

module.exports = processPostback = ((event) => {
    const senderId = event.sender.id;
    const payload = event.postback.payload;
    console.log("payload" , event.postback.payload)
    if (payload === 'WELCOME') {
        request({
            url: 'https://graph.facebook.com/v2.6/' + senderId,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            },
            method: 'GET',
        }, ((error, response, body) => {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            }
            else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                name = bodyObject.first_name;
                greeting = "Hello " + name + ". ";
            }

            let message = greeting + "Welcome to Healthbot. Hope you are       doing good today";
            let message2 = "I am your nutrition tracker :-)"
            let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";

            senderAction(senderId);
            sendMessage(senderId, { text: message }).then(() => {
                sendMessage(senderId, { text: message2 }).then(() => {
                    sendMessage(senderId, { text: message3 }).then(() => {
                        sendMessage(senderId, { text: '🎈' });
                    })
                });
            });
        }))
    }
})