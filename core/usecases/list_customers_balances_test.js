var should = require('chai').should()
var TransactionGateway = require('../gateways/transaction_gateway')
var ListCustomersBalances = require('./list_customers_balances')


function ListCustomersPresenterSpy(){
    this.customers = []
}

ListCustomersPresenterSpy.prototype.list = function(customers){
    this.customers = customers
}

describe('List Customers Balances', function () {

    it('should not list customer balances when has no transactions', function () {
        var gateway = new TransactionGateway()
        var presenter = new ListCustomersPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(0)
    })

    it('should list customer balance when has one transaction', function () {
        var gateway = new TransactionGateway()
        gateway.save({who: 'john', howMany: 1, howMuch: 9})
        var presenter = new ListCustomersPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(1)
        presenter.customers[0].amount.should.be.equal(9)
        presenter.customers[0].name.should.be.equal('john')
    })

    it('should list customer balance with the sum of the transactions amount', function () {
        var gateway = new TransactionGateway()
        gateway.save({who: 'john', howMany: 1, howMuch: 9})
        gateway.save({who: 'john', howMany: 2, howMuch: 18})
        var presenter = new ListCustomersPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(1)
        presenter.customers[0].amount.should.be.equal(27)
        presenter.customers[0].name.should.be.equal('john')
    })

    it('should list customer balance for each different customer', function () {
        var gateway = new TransactionGateway()
        gateway.save({who: 'john', howMany: 1, howMuch: 9})
        gateway.save({who: 'ronan', howMany: 2, howMuch: 18})
        gateway.save({who: 'ronan', howMany: 2, howMuch: 1})
        var presenter = new ListCustomersPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(2)
        presenter.customers[0].amount.should.be.equal(9)
        presenter.customers[0].name.should.be.equal('john')
        presenter.customers[1].amount.should.be.equal(19)
        presenter.customers[1].name.should.be.equal('ronan')
    })


})
