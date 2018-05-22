require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./api/index');
const auth = require('./api/auth');
const models = require('./models');
models.sequelize.sync().then(function() {
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    //Handle Routes
    app.use('/', index);
    //Handle user login/register
    app.use('/auth', auth);

    app.listen(3000, () => console.log('Activated and listening to port 3000'));
});
