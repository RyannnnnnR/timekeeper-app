require('dotenv').config();
const express = require('express');
const app = express();
const index = require('./api/index');
const authorization = require('./api/authorization');
const models = require('./models');
models.sequelize.sync().then(function() {
    app.use('/', index);
    app.post('/test', authorization.authorizeWithPermission('admin'), function (req, res) {
        res.json({token: "HI"})
    });

    app.listen(3000, () => console.log('Activated and listening to port 3000'));
});
