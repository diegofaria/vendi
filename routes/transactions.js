var express = require('express')
var bodyParser = require('body-parser')

var ListCustomersBalances = require('../core/usecases/list_customers_balances')
var SaveTransaction = require('../core/usecases/save_transaction')
var TransactionGateway = require('../core/gateways/transaction_gateway')
var gateway = new TransactionGateway()

var transactionsRouter = express.Router()
transactionsRouter.use(function(req, res,next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    next()
})
transactionsRouter.use(bodyParser.json())
transactionsRouter.use(bodyParser.urlencoded({extended: false}))
transactionsRouter.route('/')
.post(function(req, res) {
    var newTransaction = {
        who: req.body.who,
        howMany: req.body.howMany,
        howMuch: req.body.howMuch,
    }
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
})
.get(function(req, res) {
    new ListCustomersBalances(gateway, {
        list: function(balances){
            res.json(balances)
        }
    }).execute()
});

module.exports = transactionsRouter
