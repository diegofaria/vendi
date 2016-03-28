var React = require('react');
var ReactDOM = require('react-dom');

var TransactionBox = require('../components/transaction-box.js')

ReactDOM.render(
    <TransactionBox url="/api/transactions" pullInterval={2000}/>,
    document.getElementById('content')
);
