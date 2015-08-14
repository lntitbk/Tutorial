// server.js
//
// BASE SETUP
// =================================================================================================
//
//call the package , we need

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var useragent = require('useragent');

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

// created router for user get, post
    router.route('/users')
      .post( function(req, res){
       var user = new User();
       user.account = req.body.account;
       user.pass = req.body.pass;
       console.log(req.body);
       user.save(function(err){
       if(err) {
         console.log("Post error");
         res.send(err);
       } else {
           console.log("Post sucessfull!!");
           res.json({message:'user created!'});
       }
       });
       })
       .get( function(req, res){
         User.find(function(err, users){
         if(err){
          res.send(err);
         } else{
          res.render('listView', { listUsers : users});
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

// created router
    router.get('/', function(req, res){
      var agent = useragent.lookup(req.headers['user-agent']);
      if(agent.device.toString() != 'Other 0.0.0'){
        res.send('mobie');
      }
       else
      res.render('index');
    })
    .post('/', function(req, res){
     // res.send('welcome ' + req.body.id);
      console.log(req.body.pass);
      User.findOne({ account : req.body.id },function(err,user){
       if(err){
         res.send(err);
       } else {
           var pass = user.pass;
           console.log(user.pass);
           console.log(req.body.pass);
         if(pass === req.body.pass){
           res.render('success');
         } else
         {
          res.send("False");
         }
       }
      });
    });
// api login
    router.route('/login')
        .get( function( req, res){
        // to do login
        res.render('login');
        })
        .post( function( req, res){
          console.log('OK loginiing');
          User.findOne({account : req.body.account }, function(err, user){
            if(err){
              res.send(err);    
            } else {
              if(user.pass === req.body.pass)
                res.send('log in successfull!');
              else res.send('log in fail');
            }
          });
        });
// sign up
   router.route('/signup')
       .get( function( req, res){
       // to do signup
         res.render('signup');
       })
       .post( function( req, res){
         res.send('OK signout');
        var user = new User();
        user.account = req.body.account;
        user.pass = req.body.pass;
        
        user.save(function (err) {
          if(err) res.send(err)
          else res.send({message : 'created User'});
        });
       });
// api of server
    app.get('/', function(req, res){
        res.render('index', {title: 'Hey', message: 'Hello there!!'});
    });
    app.use('/api', router);

// listen server
    app.listen(port);
    console.log('Magic happens on Port ', port);
