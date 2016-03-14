var should = require('chai').should()
var TransactionGateway = require('../gateways/transaction_gateway.js')

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

function ListClientsPresenterSpy(){
    this.customers = []
}

ListClientsPresenterSpy.prototype.list = function(customers){
    this.customers = customers
}

describe('List Clients Balances', function () {

    it('should not list customer balances when has no transactions', function () {
        var gateway = new TransactionGateway()
        var presenter = new ListClientsPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(0)
    })

    it('should list customer balance when has one transaction', function () {
        var gateway = new TransactionGateway()
        gateway.save({who: 'john', howMany: 1, howMuch: 9})
        var presenter = new ListClientsPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(1)
        presenter.customers[0].amount.should.be.equal(9)
        presenter.customers[0].name.should.be.equal('john')
    })

    it('should list customer balance with the sum of the transactions amount', function () {
        var gateway = new TransactionGateway()
        gateway.save({who: 'john', howMany: 1, howMuch: 9})
        gateway.save({who: 'john', howMany: 2, howMuch: 18})
        var presenter = new ListClientsPresenterSpy()

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
        var presenter = new ListClientsPresenterSpy()

        new ListCustomersBalances(gateway, presenter).execute()

        presenter.customers.length.should.be.equal(2)
        presenter.customers[0].amount.should.be.equal(9)
        presenter.customers[0].name.should.be.equal('john')
        presenter.customers[1].amount.should.be.equal(19)
        presenter.customers[1].name.should.be.equal('ronan')
    })


})
