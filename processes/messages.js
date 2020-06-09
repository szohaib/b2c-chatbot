const request = require('request');
const senderActionMethods = require('../templates/senderAction');
const sendMessageMethods = require('../templates/sendMessage');

const senderAction = senderActionMethods.methods.senderAction;
const sendMessage = sendMessageMethods.methods.sendMessage;

let processMessage = ((event) => {

    if (event.message.is_echo) {
        const message = event.message;
        const senderId = event.sender.id;

        console.log("Received message from senderId : " + senderId);
        console.log("Message is : " + JSON.stringify(message));

        if (message.text) {
            console.log(message)
        }
    }


})


module.exports = {
    methods: {
        processMessage
    }
}