const express = require('express')
const app = express()
var index = require('./index/index')
app.use('/', index)

app.listen(3000, () => console.log('Activated and listening to port 3000'))