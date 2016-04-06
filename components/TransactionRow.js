import React, { PropTypes } from 'react'

const TransactionRow = (transaction) => (
    <tr>
        <td>{transaction.who}</td>
        <td>{transaction.howMany}</td>
        <td>{transaction.howMuch}</td>
    </tr>
)

TransactionRow.propTypes = {
    transaction: PropTypes.shape({
        createdAt: PropTypes.number.isRequired,
        who: PropTypes.string.isRequired,
        howMany: PropTypes.string.isRequired,
        howMuch: PropTypes.string.isRequired
    }).isRequired
}

module.exports = TransactionRow
