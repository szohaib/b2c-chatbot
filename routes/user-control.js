const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app, chalk) => {
    app.post("/onClose", (req, res) => {
        let userRequest = req.body;

        let userResponse = 'You have ordered '
        let order = ''
        console.log(userRequest.response)
        for (let i = 0; i < userRequest.response.length; i++) {
            console.log(userRequest.response[i]);
            let response = userRequest.response[i];
            console.log(response)
            order = order + `${response.itemName} of INR ${itemName.rate} `;
        }


        sendMessage(userRequest.psid, { text: userResponse }).then(() => {
            sendMessage(userRequest.psid, { text: order });
        })


        return res.status(200).json("Done");
    })
})