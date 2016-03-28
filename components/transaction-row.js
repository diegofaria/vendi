var React = require('react');

var TransactionRow = React.createClass({
    render: function(){
        return (
            <tr>
                <td>{this.props.transaction.who}</td>
                <td>{this.props.transaction.howMany}</td>
                <td>{this.props.transaction.howMuch}</td>
            </tr>
        )
    }
})


module.exports = TransactionRow
