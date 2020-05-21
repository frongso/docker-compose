var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello fucking world')
})

app.listen(8081, function () {
  console.log('app run on port 8081 in code but in container run in 8082')
})