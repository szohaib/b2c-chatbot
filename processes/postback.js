const request = require('request');
const senderActionMethods = require('../templates/senderAction');
const sendMessageMethods = require('../templates/sendMessage');
const sendGenericTemplateMethods = require("../templates/sendGenericTemplate");

const senderAction = senderActionMethods.methods.senderAction;
const sendMessage = sendMessageMethods.methods.sendMessage;
const sendGenericTemplate = sendGenericTemplateMethods.methods.sendGenericTemplate;


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

            let landingTemplate = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: "Welcome!",
                                image_url: "https://static.businessworld.in/article/article_extra_large_image/1544520138_aszxbk_thickkk.jpeg",
                                subtitle: "Best bakery items in town",
                                default_action: {
                                    type: "web_url",
                                    url: "https://petersfancybrownhats.com/view?item=103",
                                    webview_height_ratio: "tall"
                                },
                                buttons: [
                                    {
                                        type: 'web_url',
                                        url: 'https://b2c-chatbot-ui.firebaseapp.com/',
                                        title: 'View Menu'
                                    }, {
                                        type: 'postback',
                                        title: 'Start Chatting',
                                        payload: "chat"
                                    }
                                ]
                            }
                        ]

                    }
                }
            }

            senderAction(senderId);
            sendGenericTemplate(senderId, landingTemplate)
        }))
    }
})


module.exports = {
    methods: {
        processPostback
    }
}