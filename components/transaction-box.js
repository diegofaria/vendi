var React = require('react');

var TransactionForm = require('./transaction-form.js')
var TransactionTable = require('./transaction-table.js')

var SaveTransaction = require('../core/usecases/save_transaction')
var ListCustomersBalances = require('../core/usecases/list_customers_balances')
var TransactionGateway = require('../core/gateways/transaction_gateway')
var gateway = new TransactionGateway()


var TransactionBox = React.createClass({
    getInitialState: function(){
        return { data: [] }
    },
    componentDidMount: function() {
        this.loadTransactionsFromServer()
        setInterval(this.loadTransactionsFromServer, this.props.pullInterval)
    },
    loadTransactionsFromServer: function() {
        $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
        });
    },
    handleTransactionSubmit: function(transaction) {
        var transactions = this.state.data

        var newTransactions = []
        gateway.transactions = this.state.data
        new SaveTransaction(gateway, {
            error: function(){ console.log('explosion') },
            success: function(){
                new ListCustomersBalances(gateway, {
                    list: function(balances){
                        newTransactions = balances
                    }
                }).execute()
            }
        }).execute(transaction)

        this.setState({data: newTransactions})
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: transaction,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: transactions})
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    render: function(){
        return (
            <div>
                <TransactionForm onTransactionSubmit={this.handleTransactionSubmit} />
                <TransactionTable rows={this.state.data}/>
            </div>
        )
    }
})


module.exports = TransactionBox
