var express = require('express');
var PythonShell = require('python-shell');
var app = express();

app.listen(3030, function () {
  console.log('server running on port 3030');
})

app.get('/squareiterations', squareIterations);

function squareIterations(req, res) {
    var options = {
        args:
        [
            req.query.iterations
        ]
    }
    PythonShell.run('./predict.py', options, function (err, data) {
        if (err) res.send(err);
        res.send(data.toString())
    });
}