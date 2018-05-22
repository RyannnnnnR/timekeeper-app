/*
  Default route
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

// check everything works
router.get('/', function (req, res) {
  res.send('Welcome to the TimeKeper API');
});

module.exports = router;
