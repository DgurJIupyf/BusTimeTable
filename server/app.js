import { getNearBuses } from "../logic/getNearBuses";
import { getRealTime } from "../logic/getRealTime";

var express = require('express');
var dataBase = require('./db.json');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/route', function (req, res) {   
    const fromTo = dataBase.filter(item => item.from === from && item.to === to)[0];
    res.send(fromTo);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
