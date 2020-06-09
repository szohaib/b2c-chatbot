const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app ,chalk) => {
    app.post("/onClose" , (req , res) => {
        let userRequest = req.body;

        console.log("User Request 9" , userRequest);
        let userResponse = 'You have ordered '

        for(let  i = 0 ; i < userRequest.response ; i++){
            let response = userRequest.response[i];
            userResponse =  userResponse + `${response.itemName} of INR ${itemName.rate} `;
        }
        


        sendMessage(userRequest.psid ,{text :  userResponse});

        return res.status(200).json("Done");
    })
})