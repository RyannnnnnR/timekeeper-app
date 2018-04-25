var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
// check everything works
router.get('/', function (req, res) {
  res.json({message:'Welcome to the API! :)'})
})
router.post('/login', function(req, res){
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
    permission: 'admin'
  }

  jwt.sign({user: user}, 'secretkey', function(err, token) {
    res.json({token: token})
  })
})


module.exports = router
