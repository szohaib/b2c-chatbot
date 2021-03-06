const senMessageMethods = require('../templates/sendMessage');

const sendMessage = senMessageMethods.methods.sendMessage;

module.exports = ((app, chalk) => {
    app.post("/onClose", (req, res) => {
        let userRequest = req.body;

        let userResponse = 'YOUR ORDER 👇';
        let order = '';

        let quickReplies = {
            text: 'Is it all you wanted to order?',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'Yes',
                    payload: 'orderFinish',
                    image_url: 'https://lh3.googleusercontent.com/proxy/jKwd1j6Nt3PRLjhrvoqyx695Lz8cn8xsuFc__uGyyJtFs-CHKP9eoGMaKTh2RkcAc9szAUL9ohOLmu4Lu_NxSZyLnBFHyHc',
                },
                {
                    content_type: 'text',
                    title: 'No, Re-Order',
                    payload: 'reOrder',
                    image_url: 'https://lh3.googleusercontent.com/proxy/PUlegG-KJX9Jk_DTQ8kHoCIyYiwyn5muIM94Hf6i_Lr2YaavJw2jT7mZ90gfgg9Up5CYsBtP2QcXNFa6TTQJb1KcdB4VqlvvNK5roxd1u1-PS6pVdv0qOe-QEYdGmVgKmYO7VDroajmv5RviZ5Q4kL-lZKGyq6Bvgp2fMuHrs9YDDdA',
                }
            ]
        }

        let userOrder = [];
        let genericTemplateButtons = [{
            type: 'postback',
            payload: `removeFromCart`,
            title: 'Remove'
        }];


        for (let i = 0; i < userRequest.response.length; i++) {
            let response = userRequest.response[i];

            userOrder.push({
                title: response.itemName,
                subtitle: "Thickshake",
                quantity: 2,
                price: response.rate,
                currency: "INR",
                image_url: response.imageURL
            })
        }

        let genericTemplateReply = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Stephane Crozatier",
                    order_number: "12345678902",
                    currency: "INR",
                    timestamp: "1428444852",
                    payment_method:"v",  
                    summary : {
                        total_cost : 500
                    },
                    adjustments: [
                        {
                            name: "New Customer Discount",
                            amount: 20
                        },
                        {
                            name: "10/- Off Coupon",
                            amount: 10
                        }
                    ],
                    elements: userOrder

                }
            }
        }


        sendMessage(userRequest.psid, { text: userResponse }).then(() => {
            sendMessage(userRequest.psid, genericTemplateReply).then(() => {
                sendMessage(userRequest.psid, quickReplies);
            });
        })


        return res.status(200).json("Done");
    })
})