import { connect } from 'react-redux'
import TransactionTable from '../components/TransactionTable'

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    }
}

const TransactionTableContainer = connect(mapStateToProps)(TransactionTable)

module.exports = TransactionTableContainer
