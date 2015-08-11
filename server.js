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

var router = express.Router();

router.route('/users')
  .post( function(req, res){
     var user = new User();

     user.account = req.body.account;
     user.pass = req.body.pass;
     console.log(req.body);
     user.save(function(err){
       if(err) {
         console.log("=========ERROR==========");
         res.send(err);
       } else {
           console.log("============================");
           res.json({message:'user created!'});
    }
   });
  })
 .get( function(req, res){
    User.find(function(err, users){
    if(err){
      res.send(err);    
    } else{
      res.json(users);
    }
  });
});

router.route('/users/:use_id')
      .put(function(req, res){
        console.log(1);
        User.findById(req.params.use_id, function(err, use){
            if(err) res.send(err);
            else{
              use.pass = req.body.pass;
              use.save(function(err){
                  console.log('Update process!!');
                  if(err) res.send(err)
                  else res.json({message : 'Use update!!'});
              });
            }
        });
      })
      .get(function(req, res){
        console.log(2);
        User.findById(req.params.use_id, function(err, use){
            if(err) res.send(err) 
            else res.json(use);
        });
      })
      .delete(function(req, res){
        console.log(3);
        User.remove({_id: req.params.use_id}, function(err, use){
            if(err) res.send(err);
            else res.json({message : "successfull delete!!"});
        });
      });

//router.use(function(req, res, next){
//    console.log('something is happenning.');
//    next();
//});

router.get('/', function(req, res){
   // res.json({  message : 'welcome to API!'});
   res.render('index', {title : 'welcome', message: 'welcome express and jade!!'});a
});

//app.get('/index', function(req, res){
//    res.render('index', {title: 'Hey', message: 'Hello there!!'});
//});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on Port ', port);

