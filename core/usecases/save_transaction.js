function SaveTransaction(transactionGateway, saveTransactionPresenter){
    this.transactionGateway = transactionGateway
    this.saveTransactionPresenter = saveTransactionPresenter
    this.fields = ['who', 'howMany', 'howMuch']
}

SaveTransaction.prototype.execute = function(transaction){
    for (var i = 0; i < this.fields.length; i++) {
        if (!transaction[this.fields[i]]) {
            this.saveTransactionPresenter.error()
            return
        }
    }

    this.transactionGateway.save(transaction)
}

module.exports = SaveTransaction
