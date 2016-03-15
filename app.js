var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.argv[2] || 3000
var app = express()

var ListCustomersBalances = require('./core/usecases/list_customers_balances')
var SaveTransaction = require('./core/usecases/save_transaction')
var TransactionGateway = require('./core/gateways/transaction_gateway')
var gateway = new TransactionGateway()

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
    new ListCustomersBalances(gateway, {
        list: function(balances){
            response.render('index', {balances: balances})
        }
    }).execute()
})

app.post('/who', function(request, response) {
    var transaction = {
        'who': request.body.who,
        'howMany': parseInt(request.body.howMany),
        'howMuch': parseInt(request.body.howMuch),
    }

    var presenter = {
        error: function(){response.send("deu pau")},
        success: function(){response.redirect('/')}
    }
    var saveTransaction = new SaveTransaction(gateway, presenter)
    saveTransaction.execute(transaction)
})


app.listen(port)
console.log("Server is up and running.");
