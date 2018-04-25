const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const db = require('mysql')
var index = require('./api/index')
var authorization = require('./api/authorization')

var con = db.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS timekeeperdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("USE timekeeperdb", function (err, result) {
    if (err) throw err;
    console.log("Database Selected");
  });
  con.query("CREATE TABLE IF NOT EXISTS Roles(id int, role varchar(255), PRIMARY KEY(id));", function (err, result) {
    if (err) throw err;
    console.log("Roles table created");
  })
con.query("CREATE TABLE IF NOT EXISTS Teams(id int auto_increment, name varchar(255), department varchar(255), PRIMARY KEY(id))", function (err, result) {
  if (err) throw err;
  console.log("Teams table created");
})
con.query("CREATE TABLE IF NOT EXISTS Users (id int auto_increment, fname varchar(255), lname varchar(255), role_id int, PRIMARY KEY(id), FOREIGN KEY(role_id) REFERENCES Roles(id))", function (err, result) {
  if (err) throw err;
  console.log("Users table created");
})
con.query("CREATE TABLE IF NOT EXISTS User_Teams(id int auto_increment, user_id int, team_id int, PRIMARY KEY(id), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(team_id) REFERENCES Teams(id))", function (err, result) {
  if (err) throw err;
  console.log("User Team Intermediary created");
})
con.query("CREATE TABLE IF NOT EXISTS Entries(id int auto_increment, description  varchar(255), user_id int, team_id int, time_added time, date_added date, PRIMARY KEY(id), FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(team_id) REFERENCES Teams(id))", function (err, result) {
  if (err) throw err;
  console.log("Entries table created");
})
});
app.use('/', index)
app.post('/test', authorization.authorizeWithPermission('admin'), function(req,res){
  res.json({token: "HI"})
})

app.listen(3000, () => console.log('Activated and listening to port 3000'))
