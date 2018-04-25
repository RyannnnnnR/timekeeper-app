var express = require('express')
const authorization = require('authorization');
var router = express.Router()

// check everything works
router.get('/users', authorization.authorizeWithPermission('admin'), function (req, res) {
  //return all users
})
//return single

//create users

//update user


module.exports = router
