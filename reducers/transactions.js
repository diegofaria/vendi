const transaction = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TRANSACTION':
            return [
                ...state,
                action.transaction
            ]
        default:
            return state
    }
}

const transactionApp = (state = {transactions: []}, action) => {
    switch(action.type) {
        case 'ADD_TRANSACTION':
            return {
                transactions: transaction(state.transactions, action)
            }
        default:
            return state
    }
}


export default transactionApp
