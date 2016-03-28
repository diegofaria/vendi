var React = require('react');

var TransactionForm = React.createClass({
    getInitialState: function(){
        return {
            who: '',
            howMany: '',
            howMuch: ''
        }
    },
    handleWhoChange: function(e){
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
        this.props.onTransactionSubmit({who: who, howMany: howMany, howMuch: howMuch})
        this.setState({who: '', howMany: '', howMuch: ''});
    },
    render: function() {
        return (
            <form className="transactionForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Who?"
                    value={this.state.who}
                    onChange={this.handleWhoChange}/>
                <input type="text" placeholder="How many?"
                    value={this.state.howMany}
                    onChange={this.handleHowManyChange}/>
                <input type="text" placeholder="How much?"
                    value={this.state.howMuch}
                    onChange={this.handleHowMuchChange}/>
                <input type="submit" value="Add" />
            </form>
        );
    }
});


module.exports = TransactionForm
