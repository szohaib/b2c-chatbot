const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app ,chalk) => {
    app.post("/onClose" , (req , res) => {
        let userRequest = req.body;

        console.log("User Request 9" , userRequest);

        sendMessage(userRequest.data['psid'] , userRequest.data['response']);

        return res.status(200).json("Done");
    })
})