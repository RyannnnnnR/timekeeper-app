const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

// check everything works
router.get('/', function (req, res) {
  models.Role.findById(1).then(function(role) {
    if(role){
      console.log(role.roleName);
    }else{
      console.log('nothing');
    }
  })
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
