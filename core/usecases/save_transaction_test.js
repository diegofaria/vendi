var should = require('chai').should();
var SaveTransaction = require('./save_transaction.js')
var TransactionGateway = require('../gateways/transaction_gateway.js')

function SaveTransactionPresenterSpy(){
    this.hasErrors = false
}

SaveTransactionPresenterSpy.prototype.error = function(){
    this.hasErrors = true
}

describe('SaveTransaction', function () {

    it('should save transaction when all fields filled', function () {
        var gateway = new TransactionGateway()
        var presenter = new SaveTransactionPresenterSpy()
        var transaction = {who: "John Doe", howMany: 1, howMuch: 1}

        new SaveTransaction(gateway, presenter).execute(transaction)

        transactions = gateway.findAll()
        transactions.length.should.be.equal(1)
        transactions[0].should.be.eql(transaction)
        presenter.hasErrors.should.be.false

    });

    it('should not save transaction when a field is missing', function () {
        var gateway = new TransactionGateway()
        var transaction = {howMany: 1, howMuch: 1}
        var presenter = new SaveTransactionPresenterSpy()

        new SaveTransaction(gateway, presenter).execute(transaction)

        transactions = gateway.findAll()
        transactions.length.should.be.equal(0)
        presenter.hasErrors.should.be.true
    });

});
