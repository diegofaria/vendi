var _ = require("underscore");

function ListCustomersBalances(transactionGateway, presenter){
    this.transactionGateway = transactionGateway
    this.presenter = presenter
}

ListCustomersBalances.prototype.execute = function(){
    var transactions = this.transactionGateway.findAll()
    var balances = []

    var transactionsByName = _.groupBy(transactions, function(transaction){ return transaction.who; });
    _.each(transactionsByName, function(customerTransactions){
        customerBalance = { name: '', howMany:0, howMuch:0 }
        _.each(customerTransactions, function(transaction){
            customerBalance['who'] = transaction.who
            customerBalance['howMany'] += transaction.howMany
            customerBalance['howMuch'] += transaction.howMuch
        })
        balances.push(customerBalance)
    })

    this.presenter.list(balances)
}


module.exports = ListCustomersBalances
