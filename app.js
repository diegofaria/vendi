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

app.post('/api/transactions', function(req, res) {
    var newTransaction = {
        who: req.body.who,
        howMany: req.body.howMany,
        howMuch: req.body.howMuch,
    };
    new SaveTransaction(gateway, {
        error: function(){response.send("explosion")},
        success: function(){
            new ListCustomersBalances(gateway, {
                list: function(balances){
                    res.json(balances)
                }
            }).execute()
        }
    }).execute(newTransaction)
});

app.get('/api/transactions', function(req, res) {
    new ListCustomersBalances(gateway, {
        list: function(balances){
            res.json(balances)
        }
    }).execute()
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
