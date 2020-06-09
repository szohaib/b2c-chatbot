const request = require('request');


let sendGenericTemplate = ((recipientId, messageData) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: recipientId },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error)
        }
    })
})


module.exports = {
    methods: {
        sendGenericTemplate
    }
}