const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.set('port' , (process.env.PORT || 3000));

//Setting Up Express App

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Setting Up App Routes
require('./routes/webhook-verify')(app);

//Launching App

app.listen(app.get('port') , () => {
    const url = `http://localhost:${app.get('port')}`;
    console.log('Application running')
})