require('dotenv').config()
const express = require('express')
const PythonShell = require('python-shell')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')

app.use(cors())

app.listen(config.port, function () {
  console.log(`server running on port ${config.port}`);
})

app.get('/predict', (req, res) => {
    const options = {
        args:
        [
            req.query.interactions,
            req.query.peopleCount,
            req.query.attendance,
            req.query.drinkMin,
            req.query.drinkMax
        ]
    }
    PythonShell.run('./predict.py', options, (err, data) => {
        console.log(data)
        if (err) res.send(err)
        res.send(data.toString())
    });
});