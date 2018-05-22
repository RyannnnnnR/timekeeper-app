const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
router.post('/login', function(req, res){
    models.User.findOne({where: {email: req.body.email}}).then(user => {
        if(user == null) {
            res.status(404).json({error: "User cannot be found"});
            return;
        }
        bcrypt.compare(req.body.password, user.password.replace(/\s/g,''), function (err, isMatch) {
            if (res) {
                jwt.sign({user: user}, 'secretkey', function (err, token) {
                    res.status(200).json({token})
                })
            } else {
                res.status(403).json({error: "Error: Passwords do not match"});
            }
        });
    });
});

router.post('/register', function(req, res){

});


module.exports = router;