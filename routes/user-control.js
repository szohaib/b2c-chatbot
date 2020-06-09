const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app, chalk) => {
    app.post("/onClose", (req, res) => {
        let userRequest = req.body;

        let userResponse = 'You have ordered';
        let order = '';

        let quickReplies = {
            text : 'Is it all you wanted to order?',
            quick_replies : [
                {
                    content_type : 'text',
                    title : 'Yes',
                    payload : 'orderFinish',
                    image_url : 'https://lh3.googleusercontent.com/proxy/jKwd1j6Nt3PRLjhrvoqyx695Lz8cn8xsuFc__uGyyJtFs-CHKP9eoGMaKTh2RkcAc9szAUL9ohOLmu4Lu_NxSZyLnBFHyHc',
                },
                {
                    content_type : 'text',
                    title : 'No, I want to Re-Order',
                    payload : 'reOrder',
                    image_url : 'https://lh3.googleusercontent.com/proxy/PUlegG-KJX9Jk_DTQ8kHoCIyYiwyn5muIM94Hf6i_Lr2YaavJw2jT7mZ90gfgg9Up5CYsBtP2QcXNFa6TTQJb1KcdB4VqlvvNK5roxd1u1-PS6pVdv0qOe-QEYdGmVgKmYO7VDroajmv5RviZ5Q4kL-lZKGyq6Bvgp2fMuHrs9YDDdA',
                }
            ]
        }


        console.log(userRequest.response)
        for (let i = 0; i < userRequest.response.length; i++) {
            console.log(userRequest.response[i]);
            let response = userRequest.response[i];
            console.log(response.itemName)
            order = order + `${response.itemName} of INR ${response.rate} `;
        }


        sendMessage(userRequest.psid, { text: userResponse }).then(() => {
            sendMessage(userRequest.psid, { text: order }).then( () => {
                sendMessage(userRequest.psid , quickReplies);
            });
        })


        return res.status(200).json("Done");
    })
})