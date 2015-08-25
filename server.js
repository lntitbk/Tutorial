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
var mongoUrl = 'mongodb://localhost:27017/lntdev';

//console.log(connect);
//
var User = require('./models/user');

app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT  || 8080;
if (process.env.OPENSHIFT_NODEJS_IP) {
  mongoUrl = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/lntdev';
}

var connect = mongoose.connect(mongoUrl);
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
