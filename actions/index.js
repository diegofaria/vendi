export const addTransaction = function(transaction) {
    return {
        type: 'ADD_TRANSACTION',
        transaction: {
            who: transaction.who,
            howMany: transaction.howMany,
            howMuch: transaction.howMuch,
            createdAt: transaction.createdAt
        }
    }
}
