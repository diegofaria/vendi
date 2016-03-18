var TransactionRow = React.createClass({
    render: function(){
        return (
            <tr>
                <td>{this.props.transaction.name}</td>
                <td>{this.props.transaction.howMany}</td>
                <td>{this.props.transaction.howMuch}</td>
            </tr>
        )
    }
})

var TransactionTable = React.createClass({
    render: function(){
        var transactions = this.props.rows.map(function(transaction){
            return (
                <TransactionRow transaction={transaction} key={transaction.id}/>
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

var TransactionForm = React.createClass({
    render: function() {
        return (
            <form className="transactionForm">
                <input type="text" placeholder="Who?"/>
                <input type="text" placeholder="How many?"/>
                <input type="text" placeholder="How much?"/>
                <input type="submit" value="Add" />
            </form>
        );
    }
});

var TransactionBox = React.createClass({
    render: function(){
        return (
            <div>
                <TransactionForm />
                <TransactionTable rows={this.props.data}/>
            </div>
        )
    }
})

var DATA = [
    {id: 1, name: 'John', howMany: 2, howMuch: 20},
    {id: 2, name: 'John', howMany: 2, howMuch: 20},
    {id: 3, name: 'John', howMany: 2, howMuch: 20},
    {id: 4, name: 'John', howMany: 2, howMuch: 20}
]

ReactDOM.render(
    <TransactionBox url="/api/transactions" data={DATA}/>,
    document.getElementById('content')
);
