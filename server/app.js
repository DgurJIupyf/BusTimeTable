var express = require('express');
var dataBase = require('./db.json');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/route', function (req, res) {
    console.log(req.query)
    res.send(dataBase);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
