var express = require('express')
const authorization = require('../middleware/authorization');
const models = require('../models');
var router = express.Router()

// check everything works
// , authorization.authorizeWithPermission('admin'),
router.get('/', async function(req, res) {
        //return all users
        let users = await models.User.findAll({ include: models.Team });
        console.log(JSON.stringify(users[0], null, 2))
        return res.send("OK");
    })
    //return single

//create users

//update user

router.get('/check-email', function(req, res) {
    models.User.findOne({ where: { email: req.query.email } }).then(function(user) {
        if (!user) {
            res.status(200).json({ taken: false });
        } else {
            res.status(200).json({ taken: true });
        }
    });
});

module.exports = router;