const request = require('request');

module.exports = sendMessage = ((recipientId, message) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v7.0/me/messages',
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: recipientId },
                "message": {
                    "text": "Pick a color:",
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Red",
                            "payload": "<POSTBACK_PAYLOAD>",
                            "image_url": "http://example.com/img/red.png"
                        }, {
                            "content_type": "text",
                            "title": "Green",
                            "payload": "<POSTBACK_PAYLOAD>",
                            "image_url": "http://example.com/img/green.png"
                        }
                    ]
                }
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