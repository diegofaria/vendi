function ListCustomersBalances(transactionGateway, presenter){
    this.transactionGateway = transactionGateway
    this.presenter = presenter
}

ListCustomersBalances.prototype.execute = function(){
    var transactions = this.transactionGateway.findAll()
    var balances_dict = {}
    var balances_list = []

    for(var i = 0; i < transactions.length; i++){
        transaction = transactions[i]
        if(balances_dict[transaction.who])
            balances_dict[transaction.who] += transaction.howMuch
        else
            balances_dict[transaction.who] = transaction.howMuch
    }

    for (item in balances_dict) {
        balances_list.push({name: item, amount: balances_dict[item]})
    }

    this.presenter.list(balances_list)
}


module.exports = ListCustomersBalances
