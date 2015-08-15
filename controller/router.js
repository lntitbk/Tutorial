var express = require('express');
var User = require('../models/user');
var useragent = require('useragent');
var router = express.Router();

router.route('/')
  .get( function(req, res){
      var agent = useragent.lookup(req.headers['user-agent']);
      if(agent.device.toString() != 'Other 0.0.0'){
        res.send('mobie');
      }
       else
      res.render('index');
      });

router.route('/login')
  .get(function( req, res){
    console.log('controler login');
    res.render('login');
  })
  .post( function( req, res){
    User.findOne( { account : req.body.account },
    function(err, user){
      if(err){ res.send(err); }
      else {
        if(user.pass === req.body.pass) res.send('welcome ' + user.account);
        else res.send('log in fail');    
           }
    });   
  });

router.route('/signup')
  .get( function( req, res){
    res.render('signup');
  })
  .post( function( req, res){
    var user = new User();
    user.account = req.body.account;
    user.pass = req.body.pass;
    user.save( function(err){
      if(err) res.send(err)
      else res.send({ message : 'created User!!'});
    })
  });

router.route('/detail')
  .get( function( req, res){
    User.find( function( err, users){
      if( err ) res.send(err);
      else res.render('listView', { listUsers : users});
    });
  });

module.exports = {router : router};
