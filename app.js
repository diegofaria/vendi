var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

var ListCustomersBalances = require('./core/usecases/list_customers_balances')
var SaveTransaction = require('./core/usecases/save_transaction')
var TransactionGateway = require('./core/gateways/transaction_gateway')
var gateway = new TransactionGateway()

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/balances', function(request, response) {
    new ListCustomersBalances(gateway, {
        list: function(balances){
            response.render('index', {balances: balances})
        }
    }).execute()
})

app.post('/api/who', function(request, response) {
    var transaction = {
        'who': request.body.who,
        'howMany': parseInt(request.body.howMany),
        'howMuch': parseInt(request.body.howMuch),
    }

    new SaveTransaction(gateway, {
        error: function(){response.send("deu pau")},
        success: function(){response.redirect('/')}
    }).execute(transaction)
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
