import { connect } from 'react-redux'
import TransactionTable from '../components/TransactionTable'

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    }
}
console.log(TransactionTable.propTypes)
const TransactionTableContainer = connect(mapStateToProps)(TransactionTable)

module.exports = TransactionTableContainer
