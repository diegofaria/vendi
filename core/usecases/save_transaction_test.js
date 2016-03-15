var should = require('chai').should()
var SaveTransaction = require('./save_transaction.js')
var TransactionGateway = require('../gateways/transaction_gateway.js')

function SaveTransactionPresenterSpy(){
    this.hasErrors = false
    this.successSpied = false
}

SaveTransactionPresenterSpy.prototype.error = function(){
    this.hasErrors = true
}

SaveTransactionPresenterSpy.prototype.success = function(){
    this.successSpied = true
}

describe('SaveTransaction', function () {

    it('should save transaction when all transactions filled', function () {
        var gateway = new TransactionGateway()
        var presenter = new SaveTransactionPresenterSpy()
        var transaction = {who: "John Doe", howMany: 1, howMuch: 1}

        new SaveTransaction(gateway, presenter).execute(transaction)

        transactions = gateway.findAll()
        transactions.length.should.be.equal(1)
        savedTransaction = transactions[0]
        savedTransaction.who.should.be.eql(transaction.who)
        savedTransaction.howMany.should.be.eql(transaction.howMany)
        savedTransaction.howMuch.should.be.eql(transaction.howMuch)
        savedTransaction.createdAt.should.not.be.undefined
        presenter.hasErrors.should.be.false
        presenter.successSpied.should.be.true
    })

    it('should not save transaction when a field is missing', function () {
        var gateway = new TransactionGateway()
        var transaction = {howMany: 1, howMuch: 1}
        var presenter = new SaveTransactionPresenterSpy()

        new SaveTransaction(gateway, presenter).execute(transaction)

        transactions = gateway.findAll()
        transactions.length.should.be.equal(0)
        presenter.hasErrors.should.be.true
        presenter.successSpied.should.be.false
    })

})
