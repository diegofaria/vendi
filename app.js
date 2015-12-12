var express = require('express')
var path = require('path')
var port = process.argv[2] || 3000
var app = express()

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
    response.render('index', {date: new Date().toDateString()})
})

app.listen(port)
console.log("Server is up and running.");
