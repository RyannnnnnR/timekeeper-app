require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./api/router');
const models = require('./models');

models.sequelize.authenticate().then(function() {
    //Handle Routes
    app.use('/', routes.Index);
    // Handle user login/register
    app.use('/auth', routes.Auth);
    app.use('/users', routes.Users);

    app.listen(3000, () => console.log('Activated and listening to port 3000'));
}).catch('Cannot connect to database. Aborting.');