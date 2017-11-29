var express = require('express');
var PythonShell = require('python-shell');
var app = express();

app.listen(3030, function () {
  console.log('server running on port 3030');
})

app.get('/predict', predict);

function predict(req, res) {
    var options = {
        args:
        [
            req.query.interactions,
            req.query.peopleCount,
            req.query.attendance,
            req.query.drinkMin,
            req.query.drinkMax
        ]
    }
    PythonShell.run('./predict.py', options, function (err, data) {
        console.log(data)
        if (err) res.send(err);
        res.send(data.toString())
    });
}