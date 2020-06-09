const request = require('request');
const senderActionMethods = require('../templates/senderAction');
const sendMessageMethods = require('../templates/sendMessage');

const senderAction = senderActionMethods.methods.senderAction;
const sendMessage = sendMessageMethods.methods.sendMessage;



const processPostback = ((event) => {

    const senderId = event.sender.id;
    const payload = event.postback.payload;
    console.log("payload", event.postback.payload)
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

            let message = greeting + "Welcome to Thickshake Factory. Hope you are doing good today";
            let message2 = "Please select from below:"

            let quickRepliesObject = {
                text: "Pick a color:",
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Show Menu",
                        payload: "showMenu",
                    }, {
                        content_type: "text",
                        title: "Talk to Agent",
                        payload: "talkToAgent",
                    }
                ]
            }

            senderAction(senderId);
            sendMessage(senderId, { text: message }).then(() => {
                sendMessage(senderId, quickRepliesObject)
            });
        }))
    }
})


module.exports = {
    methods : {
        processPostback
    }
}