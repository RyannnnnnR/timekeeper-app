const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
const Role = sequelize.import('../models/Role');
// check everything works
router.get('/', function (req, res) {
    Role.findById(1).then(role =>{
        console.log(role.role);
    });

});
router.post('/login', function(req, res){
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
    permission: 'admin'
  };

  jwt.sign({user: user}, 'secretkey', function(err, token) {
    res.json({token: token})
  })
});


module.exports = router
