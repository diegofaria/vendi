function SaveTransaction(transactionGateway, saveTransactionPresenter){
    this.transactionGateway = transactionGateway
    this.saveTransactionPresenter = saveTransactionPresenter
    this.requiredFields = ['who', 'howMany', 'howMuch']
}

SaveTransaction.prototype.execute = function(transaction){
    for (var i = 0; i < this.requiredFields.length; i++) {
        if (!transaction[this.requiredFields[i]]) {
            this.saveTransactionPresenter.error()
            return
        }
    }

    transaction.createdAt = new Date()
    this.transactionGateway.save(transaction)
    this.saveTransactionPresenter.success()
}

module.exports = SaveTransaction
