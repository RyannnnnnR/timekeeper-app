const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
var index = require('./api/index')
var authorization = require('./api/authorization')

app.use('/', index)

app.listen(3000, () => console.log('Activated and listening to port 3000'))
