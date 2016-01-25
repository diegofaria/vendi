function DebtGateway(){
    this.debts = []
}

DebtGateway.prototype.findAll = function(){
    return this.debts
}

DebtGateway.prototype.save = function(debt){
    this.debts.push(debt)
}

module.exports = DebtGateway
