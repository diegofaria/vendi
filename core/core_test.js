var should = require('chai').should();

function DebtGateway(){
    this.debts = []
}

DebtGateway.prototype.findAll = function(){
    return this.debts
}

DebtGateway.prototype.save = function(debt){
    this.debts.push(debt)
}


function SaveDebt(debtGateway){
    this.debtGateway = debtGateway
}

SaveDebt.prototype.execute = function(debt){
    this.debtGateway.save(debt)
}

describe('SaveDebt', function () {
    it('should save debt when all fields filled', function () {
        var gateway = new DebtGateway()
        var debt = {who: "John Doe", howMany: 1, howMuch: 1}

        new SaveDebt(gateway).execute(debt)

        debts = gateway.findAll()
        debts.length.should.be.equal(1)
        debts[0].should.be.eql(debt)
    });
});
