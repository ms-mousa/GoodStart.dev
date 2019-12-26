("use strict");
// import express mongoose and body parser
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const db = require("mongoose");
// initialize the server as an express object
const server = express();

// Import URI to connect to database from the secrets file
const URI =
  "mongodb+srv://GoodStart:G00d$taRt!@@goodstart-itjqy.mongodb.net/test?retryWrites=true&w=majority";

// use the imported URI to connect to the db
db.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to db successful"))
  .catch(err => console.log(err));
// use the bodyparser as an app level middlerware function
server.use(bodyParser.json());

// import the user model
const User = require("./UserModel");

// @route   GET api Users
// @desc    Get all the Users
// @access  Public
server.get("/.netlify/functions/user", (req, res) => {
  res.json("hello");
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});
// @route   GET api Users
// @desc    Get all the Users
// @access  Public
server.get("/", (req, res) => {
  res.json("root");
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// export the serverless version of the server for netlify
module.exports = server; // for local server
module.exports.handler = serverless(server);
