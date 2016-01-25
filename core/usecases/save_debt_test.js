var should = require('chai').should();
var SaveDebt = require('./save_debt.js')
var DebtGateway = require('../gateways/debt_gateway.js')

function SaveDebtPresenterSpy(){
    this.hasErrors = false
}

SaveDebtPresenterSpy.prototype.error = function(){
    this.hasErrors = true
}

describe('SaveDebt', function () {

    it('should save debt when all fields filled', function () {
        var gateway = new DebtGateway()
        var presenter = new SaveDebtPresenterSpy()
        var debt = {who: "John Doe", howMany: 1, howMuch: 1}

        new SaveDebt(gateway, presenter).execute(debt)

        debts = gateway.findAll()
        debts.length.should.be.equal(1)
        debts[0].should.be.eql(debt)
        presenter.hasErrors.should.be.false

    });

    it('should not save debt when a field is missing', function () {
        var gateway = new DebtGateway()
        var debt = {howMany: 1, howMuch: 1}
        var presenter = new SaveDebtPresenterSpy()

        new SaveDebt(gateway, presenter).execute(debt)

        debts = gateway.findAll()
        debts.length.should.be.equal(0)
        presenter.hasErrors.should.be.true
    });

});
