var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.argv[2] || 3000
var app = express()


app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
    response.render('index', {date: new Date().toDateString()})
})

app.post('/who', function(request, response) {
    console.log(request.body.name)
    response.send(request.body.name)
})


app.listen(port)
console.log("Server is up and running.");
