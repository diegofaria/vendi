function SaveDebt(debtGateway, saveDebtPresenter){
    this.debtGateway = debtGateway
    this.saveDebtPresenter = saveDebtPresenter
    this.fields = ['who', 'howMany', 'howMuch']
}

SaveDebt.prototype.execute = function(debt){
    for (var i = 0; i < this.fields.length; i++) {
        if (!debt[this.fields[i]]) {
            this.saveDebtPresenter.error()
            return
        }
    }

    this.debtGateway.save(debt)
}

module.exports = SaveDebt
