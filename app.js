var express = require('express');

var app = express();

app.get('/', function(req, res){
    console.log(req);
    res.send('Hello express');
});

app.listen(8080);


