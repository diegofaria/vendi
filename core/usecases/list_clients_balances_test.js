var should = require('chai').should()
var TransactionGateway = require('../gateways/transaction_gateway.js')

function ListClientsBalances(transactionGateway, presenter){
    this.transactionGateway = transactionGateway
    this.presenter = presenter
}

ListClientsBalances.prototype.execute = function(){
    this.presenter.list([])
}

function ListClientsPresenterSpy(){
    this.clients = []
}

ListClientsPresenterSpy.prototype.list = function(){
    this.clients = []
}

describe('List Clients Balances', function () {

    it('should list no balance when has no clients', function () {
        var gateway = new TransactionGateway()
        var presenter = new ListClientsPresenterSpy()

        new ListClientsBalances(gateway, presenter).execute()

        presenter.clients.length.should.be.equal(0)

    })

})
