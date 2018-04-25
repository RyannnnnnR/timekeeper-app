var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
// check everything works
router.get('/', function (req, res) {
  res.send('Welcome to the API! :)')
})
router.get('/login', function(res, req){
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
    permission: 'admin'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
  })
})
})


module.exports = router
