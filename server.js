const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.set('port' , (process.env.PORT || 80));

//Setting Up Express App

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Setting Up App Routes
require('./routes/webhook-verify')(app);
require('./routes/user-control')(app);

app.post("/onClose" , (req , res) => {
    console.log("App Request" , req.body.data)
})

//Launching App

app.listen(app.get('port') , () => {
    const url = `http://localhost:${app.get('port')}`;
    console.log('Application running')
})