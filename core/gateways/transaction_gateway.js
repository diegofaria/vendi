function TransactionGateway(){
    this.transactions = []
}

TransactionGateway.prototype.findAll = function(){
    return this.transactions
}

TransactionGateway.prototype.save = function(transaction){
    this.transactions.push(transaction)
}

module.exports = TransactionGateway
