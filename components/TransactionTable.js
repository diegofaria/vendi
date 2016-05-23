import React, { PropTypes } from 'react'
import TransactionRow from './TransactionRow'

const TransactionTable = ({transactions}) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>How many?</th>
                <th>How much?</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map( transaction =>
                <TransactionRow {...transaction} key={transaction.createdAt}/>
            )}
        </tbody>
    </table>
)

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            createdAt: PropTypes.instanceOf(Date),
            who: PropTypes.string.isRequired,
            howMany: PropTypes.string.isRequired,
            howMuch: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

export default TransactionTable
