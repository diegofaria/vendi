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
    getInitialState: function(){
        return {
            who: '',
            howMany: '',
            howMuch: ''
        }
    }
    handlewhoChange: function(e){
        this.setState({who: e.target.value})
    },
    handleHowManyChange: function(e){
        this.setState({howMany: e.target.value})
    },
    handleHowMuchChange: function(e){
        this.setState({howMuch: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var who = this.state.who.trim();
        var howMany = this.state.howMany.trim();
        var howMuch = this.state.howMuch.trim();
        if (!who && !howMany && !howMuch)
            return;
        // TODO: send request to the server
        this.setState({who: '', howMany: '', howMuch: ''});
    }
    render: function() {
        return (
            <form className="transactionForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Who?"
                    value={this.props.input.who}
                    onChange={this.handleWhoChange}/>
                <input type="text" placeholder="How many?"
                    value={this.props.input.howMany}
                    onChange={this.handleHowManyChange}/>
                <input type="text" placeholder="How much?"
                    value={this.props.input.howMuch}
                    onChange={this.handleHowMuchChange}/>
                <input type="submit" value="Add" />
            </form>
        );
    }
});

var TransactionBox = React.createClass({
    getInitialState: function(){
        return { data: {DATA} }
    },
    handleTransactionSubmit: function(transaction) {
        this.setState({})
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
