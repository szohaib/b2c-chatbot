const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');


let processMessage = ((event) => {
    
    if(event.message.is_echo){
        const message = event.message;
        const senderId = event.sender.id;

        console.log("Received message from senderId : " + senderId);
        console.log("Message is : " + JSON.stringify(message));

        if(message.text){
            console.log(message)
        }
    }


})


module.exports = {
    processMessage : processMessage
}