// server.js
//
// BASE SETUP
// =================================================================================================
//
//call the package , we need

var express = require('express');
var app = express();

var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost:27017/lntdev');

//console.log(connect);
//
var User = require('./models/user');

app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
console.log(process.env.PORT);
console.log(port);

// ROUTER FOR OUR API
// ===========================================

var control = require('./controller/router.js');
var router = control.router;


// api login
    app.use('/api', router);

// listen server
    app.listen(port);
    console.log('Magic happens on Port ', port);
