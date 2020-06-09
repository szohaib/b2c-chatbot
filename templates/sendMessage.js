const request = require('request');

const sendMessage = ((recipientId, message) => {
    return new Promise((resolve, reject) => {
        console.log("This is recipientId" , recipientId);
        console.log("This is message" , message)
        request({
            url: 'https://graph.facebook.com/v7.0/me/messages',
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: recipientId },
                message: message
            }
        }, ((error, response, body) => {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                console.log("this is body" , body)
                resolve(body);
            }
        }))
    })
})

module.exports = {
    methods: {
        sendMessage
    }
}