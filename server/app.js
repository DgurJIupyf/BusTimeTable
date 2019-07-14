var express = require('express');
var dataBase = require('./db.json');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/listFrom', function (req, res) {
  const departurePoints = []
  dataBase.map(item => {
    if (!departurePoints.includes(item.from)) departurePoints.push(item.from);
  });
  res.send(departurePoints);
});

app.get('/listTo', function (req, res) {
  const arrivalPoints = []
  dataBase.map(item => {
    if (!arrivalPoints.includes(item.from)) arrivalPoints.push(item.from);
  });
  res.send(arrivalPoints);
});

app.get('/route', function (req, res) {
    const fromTo = dataBase.filter(item => item.from === req.query.from && item.to === req.query.to)[0];
    res.send(fromTo);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
