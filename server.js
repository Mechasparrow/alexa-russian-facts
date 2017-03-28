// server.js
// where your node app starts

// init project
var express = require('express');
var alexa = require("alexa-app");
var server = express();
var verifier = require('alexa-verifier-middleware');

var factapp = require('./src/russianfact.js');

var alexaRouter = express.Router();
server.use('/alexa', alexaRouter);

factapp.express({expressApp: alexaRouter})

var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
