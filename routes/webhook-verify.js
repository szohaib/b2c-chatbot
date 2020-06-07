const processPostback = require('../processes/postback');
const processesMessage = require('../processes/messages');


module.exports = ((app, chalk) => {
    app.get('/webhook', (req, res) => {
        if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
            console.log('Webhook verified.');
            res.status(200).send(req.query['hub.challenge'])
        }
        else {
            console.error('Verification failed. Token mismatch.');
            res.sendStatus(403);
        }
    });

    app.post('/webhook', (req, res) => {
        //checking for page subscription.
        if (req.body.object === 'page') {

            /* Iterate over each entry, there can be multiple entries 
            if callbacks are batched. */
            req.body.entry.forEach(function (entry) {
                // Iterate over each messaging event
                entry.messaging.forEach(function (event) {
                    console.log(event);
                    if (event.postback) {
                        processPostback(event);
                    } else if (event.message) {
                        processMessage(event);
                    }
                });
            });
            res.sendStatus(200);
        }
    })
})