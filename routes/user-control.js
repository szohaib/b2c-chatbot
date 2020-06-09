const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app ,chalk) => {
    app.post("/onClose" , (req , res) => {
        let userRequest = req.body.data;

        console.log("User Request 9" , userRequest);

        sendMessage(userRequest.psid , userRequest.response);

        return res.status(200).json("Done");
    })
})