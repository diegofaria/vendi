var React = require('react');
var TransactionRow = require('./transaction-row.js')

var TransactionTable = React.createClass({
    render: function(){
        var transactions = this.props.rows.map(function(transaction){
            return (
                <TransactionRow transaction={transaction} key={transaction.createdAt}/>
            )
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>How many?</th>
                        <th>How much?</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions}
                </tbody>
            </table>
        )
    }
})


module.exports = TransactionTable
