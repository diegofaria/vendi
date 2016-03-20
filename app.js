var express = require('express')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')));

var transactions = require('./routes/transactions')
app.use('/api/transactions', transactions)

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
