const request = require('request');

module.exports = sendMessage = ((recipientId, message) => {
    return new Promise((resolve, reject) => {
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
                resolve(body);
            }
        }))
    })
})