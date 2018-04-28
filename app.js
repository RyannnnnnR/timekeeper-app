require('dotenv').config();
const express = require('express');
const app = express();
const index = require('./api/index');
const authorization = require('./api/authorization');
const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
app.use('/', index);
app.post('/test', authorization.authorizeWithPermission('admin'), function(req,res){
  res.json({token: "HI"})
});

app.listen(3000, () => console.log('Activated and listening to port 3000'));
