const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app ,chalk) => {
    app.get("/onClose" , (req , res) => {
        console.log("Wroks")
        let body = req.query;
        let response = {
            "text": `Great, I will book you a ${body.bed} bed, with ${body.pillows} pillows and a ${body.view} view.`
        };
    
        res.status(200).send('Please close this window to return to the conversation thread.');
        sendMessage(body.psid, response);
    })
})